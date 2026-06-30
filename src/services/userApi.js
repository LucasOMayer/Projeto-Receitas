import { uploadImage as uploadRecipeImage } from "./api";

const USERS_API_URL = "http://localhost:3333/api/users";

async function requestUser(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao comunicar com a API de usuários.");
  }

  return data;
}

export function getUserById(id) {
  return requestUser(`${USERS_API_URL}/${id}`);
}

export async function updateUser(id, data) {
  const response = await requestUser(`${USERS_API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return response.user;
}

export async function updateUserPassword(id, data) {
  const response = await requestUser(`${USERS_API_URL}/${id}/password`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  return response.message;
}

export function uploadImage(file) {
  return uploadRecipeImage(file);
}
