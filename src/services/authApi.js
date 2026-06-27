const AUTH_API_BASE = "/api/auth";

function simulateResponse(data) {
  return Promise.resolve({
    success: true,
    data,
  });
}

export function loginUser(credentials) {
  // Futuramente:
  // return fetch(`${AUTH_API_BASE}/login`, { method: "POST", body: JSON.stringify(credentials) });
  return simulateResponse({
    endpoint: `${AUTH_API_BASE}/login`,
    message: "Login simulado com sucesso.",
    user: {
      email: credentials.email,
    },
  });
}

export function registerUser(userData) {
  // Futuramente:
  // return fetch(`${AUTH_API_BASE}/register`, { method: "POST", body: JSON.stringify(userData) });
  return simulateResponse({
    endpoint: `${AUTH_API_BASE}/register`,
    message: "Cadastro simulado com sucesso.",
    user: {
      name: userData.fullName,
      username: userData.username,
      email: userData.email,
    },
  });
}

export function recoverPassword(email) {
  // Futuramente:
  // return fetch(`${AUTH_API_BASE}/recover-password`, { method: "POST", body: JSON.stringify({ email }) });
  return simulateResponse({
    endpoint: `${AUTH_API_BASE}/recover-password`,
    message: "Recuperacao de senha simulada com sucesso.",
    email,
  });
}
