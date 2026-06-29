import { recipes } from "../data/recipes.data.js";

function findRecipeById(id) {
  return recipes.find((recipe) => recipe.id === Number(id));
}

function validateRecipe(data) {
  const requiredFields = [
    "title",
    "author",
    "category",
    "ingredients",
    "preparation",
    "preparationTime",
  ];

  return requiredFields.filter((field) => {
    const value = data[field];
    return !value || (Array.isArray(value) && value.length === 0);
  });
}

export function getRecipes(request, response) {
  response.json(recipes);
}

export function getRecipeById(request, response) {
  const recipe = findRecipeById(request.params.id);

  if (!recipe) {
    return response.status(404).json({ message: "Receita não encontrada." });
  }

  return response.json(recipe);
}

export function createRecipe(request, response) {
  const missingFields = validateRecipe(request.body);

  if (missingFields.length > 0) {
    return response.status(400).json({
      message: "Campos obrigatórios não preenchidos.",
      fields: missingFields,
    });
  }

  const newRecipe = {
    id: Date.now(),
    title: request.body.title,
    author: request.body.author,
    category: request.body.category,
    ingredients: request.body.ingredients,
    preparation: request.body.preparation,
    preparationTime: request.body.preparationTime,
    waitingTime: request.body.waitingTime || "0 min",
    imageUrl: request.body.imageUrl || "",
    likes: 0,
    comments: [],
    createdAt: new Date().toISOString(),
  };

  recipes.unshift(newRecipe);

  return response.status(201).json(newRecipe);
}

export function updateRecipe(request, response) {
  const recipeIndex = recipes.findIndex((recipe) => recipe.id === Number(request.params.id));

  if (recipeIndex === -1) {
    return response.status(404).json({ message: "Receita não encontrada." });
  }

  const currentRecipe = recipes[recipeIndex];
  const updatedRecipe = {
    ...currentRecipe,
    ...request.body,
    id: currentRecipe.id,
    createdAt: currentRecipe.createdAt,
  };

  recipes[recipeIndex] = updatedRecipe;

  return response.json(updatedRecipe);
}

export function deleteRecipe(request, response) {
  const recipeIndex = recipes.findIndex((recipe) => recipe.id === Number(request.params.id));

  if (recipeIndex === -1) {
    return response.status(404).json({ message: "Receita não encontrada." });
  }

  recipes.splice(recipeIndex, 1);

  return response.status(204).send();
}
