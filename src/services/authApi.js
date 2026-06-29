const AUTH_API_BASE = "http://localhost:3333/api/auth";

async function requestAuth(endpoint, body) {
  const response = await fetch(`${AUTH_API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao comunicar com a API de autenticação.");
  }

  return data;
}

export async function loginUser(credentials) {
  const data = await requestAuth("/login", credentials);
  return data.user;
}

export async function registerUser(userData) {
  const data = await requestAuth("/register", {
    name: userData.fullName,
    username: userData.username,
    email: userData.email,
    password: userData.password,
    confirmPassword: userData.confirmPassword,
    bio: userData.bio || "",
  });

  return data.user;
}

export async function recoverPassword(email) {
  const data = await requestAuth("/recover-password", { email });
  return data.message;
}
