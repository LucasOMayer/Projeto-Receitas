import crypto from "node:crypto";
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
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio || "",
    avatarUrl: user.avatar_url || "",
    createdAt: user.created_at,
  };
}

export async function getUserById(request, response) {
  const { id } = request.params;

  try {
    const result = await query(
      `
        SELECT id, name, username, email, bio, avatar_url, created_at
        FROM users
        WHERE id = $1
      `,
      [id],
    );

    if (!result.rows[0]) {
      return response.status(404).json({ message: "Usuário não encontrado." });
    }

    return response.json(mapUser(result.rows[0]));
  } catch (error) {
    return response.status(503).json({
      message: "Não foi possível buscar o usuário no banco de dados.",
      detail: error.message,
    });
  }
}

export async function updateUser(request, response) {
  const { id } = request.params;
  const { name, username, bio, avatarUrl, avatar_url, email } = request.body;
  const nextAvatarUrl = avatarUrl || avatar_url || "";

  if (!name || !username || !email) {
    return response.status(400).json({
      message: "Nome, nome de usuário e email são obrigatórios.",
    });
  }

  if (!isValidEmail(email)) {
    return response.status(400).json({
      message: "Informe um email válido.",
    });
  }

  try {
    const emailConflict = await query("SELECT id FROM users WHERE email = $1 AND id <> $2", [
      email,
      id,
    ]);

    if (emailConflict.rows[0]) {
      return response.status(409).json({ message: "Email já cadastrado por outro usuário." });
    }

    const usernameConflict = await query(
      "SELECT id FROM users WHERE username = $1 AND id <> $2",
      [username, id],
    );

    if (usernameConflict.rows[0]) {
      return response.status(409).json({
        message: "Nome de usuário já cadastrado por outro usuário.",
      });
    }

    const result = await query(
      `
        UPDATE users
        SET name = $1,
            username = $2,
            bio = $3,
            avatar_url = $4,
            email = $5
        WHERE id = $6
        RETURNING id, name, username, email, bio, avatar_url, created_at
      `,
      [name, username, bio || "", nextAvatarUrl, email, id],
    );

    if (!result.rows[0]) {
      return response.status(404).json({ message: "Usuário não encontrado." });
    }

    return response.json({
      message: "Perfil atualizado com sucesso.",
      user: mapUser(result.rows[0]),
    });
  } catch (error) {
    return response.status(503).json({
      message: "Não foi possível atualizar o perfil.",
      detail: error.message,
    });
  }
}

export async function updateUserPassword(request, response) {
  const { id } = request.params;
  const { currentPassword, newPassword } = request.body;

  if (!currentPassword || !newPassword) {
    return response.status(400).json({
      message: "Senha atual e nova senha são obrigatórias.",
    });
  }

  if (newPassword.length < 6) {
    return response.status(400).json({
      message: "A nova senha precisa ter pelo menos 6 caracteres.",
    });
  }

  try {
    const userResult = await query("SELECT id, password_hash FROM users WHERE id = $1", [id]);
    const user = userResult.rows[0];

    if (!user) {
      return response.status(404).json({ message: "Usuário não encontrado." });
    }

    if (user.password_hash !== hashPassword(currentPassword)) {
      return response.status(401).json({ message: "Senha atual incorreta." });
    }

    await query("UPDATE users SET password_hash = $1 WHERE id = $2", [
      hashPassword(newPassword),
      id,
    ]);

    return response.json({ message: "Senha atualizada com sucesso." });
  } catch (error) {
    return response.status(503).json({
      message: "Não foi possível atualizar a senha.",
      detail: error.message,
    });
  }
}
