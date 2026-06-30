import { query } from "../db.js";
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

function mapDatabaseRecipe(row) {
  return {
    id: row.id,
    title: row.title,
    userId: row.user_id,
    author: row.author || "Autor não informado",
    category: row.category,
    ingredients: row.ingredients,
    preparation: row.preparation,
    preparationTime: row.preparation_time,
    waitingTime: row.waiting_time,
    imageUrl: row.image_url,
    likes: Number(row.likes || 0),
    comments: row.comments || [],
    createdAt: row.created_at,
  };
}

async function getRecipesFromDatabase() {
  const result = await query(`
    SELECT
      recipes.*,
      users.name AS author,
      COUNT(DISTINCT likes.id) AS likes,
      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'id', comments.id,
            'content', comments.content,
            'userId', comments.user_id,
            'createdAt', comments.created_at
          )
        ) FILTER (WHERE comments.id IS NOT NULL),
        '[]'
      ) AS comments
    FROM recipes
    LEFT JOIN users ON users.id = recipes.user_id
    LEFT JOIN likes ON likes.recipe_id = recipes.id
    LEFT JOIN comments ON comments.recipe_id = recipes.id
    GROUP BY recipes.id, users.name
    ORDER BY recipes.created_at DESC
  `);

  return result.rows.map(mapDatabaseRecipe);
}

async function getRecipeByIdFromDatabase(id) {
  const result = await query(
    `
      SELECT
        recipes.*,
        users.name AS author,
        COUNT(DISTINCT likes.id) AS likes,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object(
              'id', comments.id,
              'content', comments.content,
              'userId', comments.user_id,
              'createdAt', comments.created_at
            )
          ) FILTER (WHERE comments.id IS NOT NULL),
          '[]'
        ) AS comments
      FROM recipes
      LEFT JOIN users ON users.id = recipes.user_id
      LEFT JOIN likes ON likes.recipe_id = recipes.id
      LEFT JOIN comments ON comments.recipe_id = recipes.id
      WHERE recipes.id = $1
      GROUP BY recipes.id, users.name
    `,
    [id],
  );

  return result.rows[0] ? mapDatabaseRecipe(result.rows[0]) : null;
}

export async function getRecipes(request, response) {
  try {
    const databaseRecipes = await getRecipesFromDatabase();
    return response.json(databaseRecipes);
  } catch {
    return response.json(recipes);
  }
}

export async function getRecipeById(request, response) {
  try {
    const databaseRecipe = await getRecipeByIdFromDatabase(request.params.id);

    if (databaseRecipe) {
      return response.json(databaseRecipe);
    }
  } catch {
    const fallbackRecipe = findRecipeById(request.params.id);

    if (fallbackRecipe) {
      return response.json(fallbackRecipe);
    }
  }

  return response.status(404).json({ message: "Receita não encontrada." });
}

export async function createRecipe(request, response) {
  const missingFields = validateRecipe(request.body);

  if (missingFields.length > 0) {
    return response.status(400).json({
      message: "Campos obrigatórios não preenchidos.",
      fields: missingFields,
    });
  }

  try {
    const result = await query(
      `
        INSERT INTO recipes (
          user_id,
          title,
          category,
          ingredients,
          preparation,
          preparation_time,
          waiting_time,
          image_url
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `,
      [
        request.body.userId || null,
        request.body.title,
        request.body.category,
        request.body.ingredients,
        request.body.preparation,
        request.body.preparationTime,
        request.body.waitingTime || "0 min",
        request.body.imageUrl || "",
      ],
    );

    return response.status(201).json(mapDatabaseRecipe(result.rows[0]));
  } catch {
    const newRecipe = {
      id: Date.now(),
      title: request.body.title,
      userId: request.body.userId || null,
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
}

export async function updateRecipe(request, response) {
  try {
    const currentRecipe = await getRecipeByIdFromDatabase(request.params.id);

    if (!currentRecipe) {
      return response.status(404).json({ message: "Receita não encontrada." });
    }

    const result = await query(
      `
        UPDATE recipes
        SET
          title = $1,
          category = $2,
          ingredients = $3,
          preparation = $4,
          preparation_time = $5,
          waiting_time = $6,
          image_url = $7
        WHERE id = $8
        RETURNING *
      `,
      [
        request.body.title || currentRecipe.title,
        request.body.category || currentRecipe.category,
        request.body.ingredients || currentRecipe.ingredients,
        request.body.preparation || currentRecipe.preparation,
        request.body.preparationTime || currentRecipe.preparationTime,
        request.body.waitingTime || currentRecipe.waitingTime,
        request.body.imageUrl || currentRecipe.imageUrl,
        request.params.id,
      ],
    );

    return response.json(mapDatabaseRecipe(result.rows[0]));
  } catch {
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
}

export async function deleteRecipe(request, response) {
  const userId = Number(request.query.userId || request.body?.userId);

  try {
    const recipeResult = await query("SELECT id, user_id FROM recipes WHERE id = $1", [request.params.id]);

    if (recipeResult.rowCount === 0) {
      return response.status(404).json({ message: "Receita não encontrada." });
    }

    const recipe = recipeResult.rows[0];

    if (!userId || Number(recipe.user_id) !== userId) {
      return response.status(403).json({ message: "Apenas o autor pode excluir esta receita." });
    }

    const result = await query("DELETE FROM recipes WHERE id = $1 RETURNING id", [request.params.id]);

    if (result.rowCount === 0) {
      return response.status(404).json({ message: "Receita não encontrada." });
    }

    return response.status(204).send();
  } catch {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === Number(request.params.id));

    if (recipeIndex === -1) {
      return response.status(404).json({ message: "Receita não encontrada." });
    }

    if (!userId || Number(recipes[recipeIndex].userId) !== userId) {
      return response.status(403).json({ message: "Apenas o autor pode excluir esta receita." });
    }

    recipes.splice(recipeIndex, 1);

    return response.status(204).send();
  }
}
