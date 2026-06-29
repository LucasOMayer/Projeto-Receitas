import crypto from "node:crypto";
import { users } from "../data/users.data.js";
import { query } from "../db.js";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function mapUser(user) {
  return {
    id: user.id,
    name: user.name || user.fullName,
    username: user.username,
    email: user.email,
    bio: user.bio || "",
    avatarUrl: user.avatar_url || user.avatarUrl || "",
  };
}

async function findUserByEmail(email) {
  const result = await query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0] || null;
}

async function findUserByUsername(username) {
  const result = await query("SELECT * FROM users WHERE username = $1", [username]);
  return result.rows[0] || null;
}

export async function login(request, response) {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({
      message: "Email e senha são obrigatórios.",
    });
  }

  if (!isValidEmail(email)) {
    return response.status(400).json({
      message: "Informe um email válido.",
    });
  }

  try {
    const user = await findUserByEmail(email);
    const passwordHash = hashPassword(password);

    if (!user || user.password_hash !== passwordHash) {
      return response.status(401).json({
        message: "Email ou senha inválidos.",
      });
    }

    return response.json({
      message: "Login realizado com sucesso. JWT será implementado em etapa futura.",
      user: mapUser(user),
    });
  } catch (error) {
    return response.status(503).json({
      message: "Não foi possível validar o login no banco de dados.",
      detail: error.message,
    });
  }
}

export async function register(request, response) {
  const { fullName, name, username, email, password, confirmPassword, bio, avatarUrl } = request.body;
  const displayName = name || fullName;

  if (!displayName || !username || !email || !password) {
    return response.status(400).json({
      message: "Nome, usuário, email e senha são obrigatórios.",
    });
  }

  if (!isValidEmail(email)) {
    return response.status(400).json({
      message: "Informe um email válido.",
    });
  }

  if (password.length < 6) {
    return response.status(400).json({
      message: "A senha precisa ter pelo menos 6 caracteres.",
    });
  }

  if (confirmPassword && password !== confirmPassword) {
    return response.status(400).json({
      message: "Senha e confirmação precisam ser iguais.",
    });
  }

  try {
    const emailAlreadyExists = await findUserByEmail(email);

    if (emailAlreadyExists) {
      return response.status(409).json({
        message: "Email já cadastrado.",
      });
    }

    const usernameAlreadyExists = await findUserByUsername(username);

    if (usernameAlreadyExists) {
      return response.status(409).json({
        message: "Nome de usuário já cadastrado.",
      });
    }

    const result = await query(
      `
        INSERT INTO users (name, username, email, password_hash, bio, avatar_url)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, name, username, email, bio, avatar_url
      `,
      [displayName, username, email, hashPassword(password), bio || "", avatarUrl || ""],
    );

    return response.status(201).json({
      message: "Cadastro realizado com sucesso.",
      user: mapUser(result.rows[0]),
    });
  } catch (error) {
    return response.status(503).json({
      message: "Não foi possível criar o usuário no banco de dados.",
      detail: error.message,
    });
  }
}

export async function recoverPassword(request, response) {
  const { email } = request.body;

  if (!email) {
    return response.status(400).json({
      message: "Email é obrigatório para recuperação de senha.",
    });
  }

  if (!isValidEmail(email)) {
    return response.status(400).json({
      message: "Informe um email válido.",
    });
  }

  try {
    await findUserByEmail(email);
  } catch {
    const fallbackUser = users.find((user) => user.email === email);
    void fallbackUser;
  }

  return response.json({
    message: "Se este email estiver cadastrado, enviaremos instruções de recuperação.",
  });
}
