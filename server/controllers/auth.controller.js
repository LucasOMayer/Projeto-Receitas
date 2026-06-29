import { users } from "../data/users.data.js";
import { query } from "../db.js";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

async function findUserByEmailInDatabase(email) {
  const result = await query("SELECT * FROM users WHERE email = $1", [email]);
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
    const user = await findUserByEmailInDatabase(email);

    if (!user || user.password_hash !== password) {
      return response.status(401).json({
        message: "Credenciais inválidas.",
      });
    }

    return response.json({
      message: "Login realizado com sucesso. JWT será implementado em etapa futura.",
      user: mapUser(user),
    });
  } catch {
    const user = users.find((currentUser) => currentUser.email === email);

    if (!user || user.password !== password) {
      return response.status(401).json({
        message: "Credenciais inválidas para login simulado.",
      });
    }

    return response.json({
      message: "Login simulado realizado com sucesso. Token real será implementado em etapa futura.",
      user: mapUser(user),
    });
  }
}

export async function register(request, response) {
  const { fullName, name, username, email, password, confirmPassword, bio, avatarUrl } = request.body;
  const displayName = name || fullName;

  if (!displayName || !username || !email || !password || !confirmPassword) {
    return response.status(400).json({
      message: "Todos os campos são obrigatórios.",
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

  if (password !== confirmPassword) {
    return response.status(400).json({
      message: "Senha e confirmação precisam ser iguais.",
    });
  }

  try {
    const result = await query(
      `
        INSERT INTO users (name, username, email, password_hash, bio, avatar_url)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `,
      [displayName, username, email, password, bio || "", avatarUrl || ""],
    );

    return response.status(201).json({
      message: "Cadastro criado com sucesso. Segurança avançada será implementada depois.",
      user: mapUser(result.rows[0]),
    });
  } catch {
    const emailAlreadyExists = users.some((user) => user.email === email);

    if (emailAlreadyExists) {
      return response.status(409).json({
        message: "Email já cadastrado no ambiente simulado.",
      });
    }

    const newUser = {
      id: Date.now(),
      fullName: displayName,
      username,
      email,
      password,
      bio: bio || "",
      avatarUrl: avatarUrl || "",
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    return response.status(201).json({
      message: "Cadastro simulado criado com sucesso. Banco real será conectado em etapa futura.",
      user: mapUser(newUser),
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
    await findUserByEmailInDatabase(email);
  } catch {
    // Fallback silencioso: por segurança, a resposta é a mesma.
  }

  return response.json({
    message: "Se este email estiver cadastrado, enviaremos instruções de recuperação.",
  });
}
