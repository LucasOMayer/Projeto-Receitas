const RECIPES_API_URL = "http://localhost:3333/api/recipes";

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

export function deleteRecipe(id) {
  return request(`${RECIPES_API_URL}/${id}`, {
    method: "DELETE",
  });
}
