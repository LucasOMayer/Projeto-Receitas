const RECIPES_API_URL = "http://localhost:3333/api/recipes";
const UPLOADS_API_URL = "http://localhost:3333/api/uploads";

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("Erro ao comunicar com a API.");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getRecipes() {
  return request(RECIPES_API_URL);
}

export function createRecipe(recipe) {
  return request(RECIPES_API_URL, {
    method: "POST",
    body: JSON.stringify(recipe),
  });
}

export function updateRecipe(id, recipe) {
  return request(`${RECIPES_API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(recipe),
  });
}

export function deleteRecipe(id, userId) {
  return request(`${RECIPES_API_URL}/${id}?userId=${userId}`, {
    method: "DELETE",
  });
}

export async function uploadImage(file) {
  const response = await fetch(UPLOADS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": file.type || "application/octet-stream",
      "x-file-name": file.name,
    },
    body: file,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao enviar imagem.");
  }

  return data.imageUrl;
}
