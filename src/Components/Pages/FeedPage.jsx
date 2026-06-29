import { useEffect, useMemo, useRef, useState } from "react";
import RecipeFilter from "../Recipes/RecipeFilter";
import RecipeForm from "../Recipes/RecipeForm";
import RecipeList from "../Recipes/RecipeList";
import { recipesMock } from "../Recipes/recipesMock";
import { createRecipe, getRecipes } from "../../services/api";
import "../Recipes/Recipes.css";

function normalizeRecipe(recipe) {
  return {
    id: recipe.id,
    name: recipe.name || recipe.title,
    author: recipe.author || "Autor não informado",
    category: recipe.category,
    ingredients: recipe.ingredients || [],
    preparation: recipe.preparation,
    prepTime: recipe.prepTime || recipe.preparationTime || recipe.preparation_time || "Não informado",
    waitTime: recipe.waitTime || recipe.waitingTime || recipe.waiting_time || "Não informado",
    imageUrl: recipe.imageUrl || recipe.image_url || "",
    likes: Number(recipe.likes || 0),
    comments: recipe.comments || [],
    createdAt: recipe.createdAt || recipe.created_at,
  };
}

function toApiRecipe(recipe) {
  return {
    title: recipe.name,
    author: recipe.author,
    category: recipe.category,
    ingredients: recipe.ingredients,
    preparation: recipe.preparation,
    preparationTime: recipe.prepTime,
    waitingTime: recipe.waitTime,
    imageUrl: recipe.imageUrl,
  };
}

function FeedPage({ currentUser, onRequireAuth }) {
  const [recipes, setRecipes] = useState(recipesMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [successMessage, setSuccessMessage] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [dataMessage, setDataMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const authMessageTimer = useRef(null);
  const isAuthenticated = Boolean(currentUser);

  useEffect(() => {
    let isMounted = true;

    async function loadRecipes() {
      try {
        const apiRecipes = await getRecipes();

        if (!isMounted) {
          return;
        }

        setRecipes(apiRecipes.map(normalizeRecipe));
        setDataMessage("Receitas carregadas da API.");
      } catch {
        if (!isMounted) {
          return;
        }

        setRecipes(recipesMock);
        setDataMessage("API indisponível. Exibindo receitas locais de exemplo.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadRecipes();

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const recipeCategories = recipes.map((recipe) => recipe.category);
    return ["Todas", ...new Set(recipeCategories)];
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return recipes.filter((recipe) => {
      const ingredientsText = recipe.ingredients.join(" ").toLowerCase();
      const matchesSearch =
        !normalizedSearch ||
        recipe.name.toLowerCase().includes(normalizedSearch) ||
        recipe.author.toLowerCase().includes(normalizedSearch) ||
        ingredientsText.includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "Todas" || recipe.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [recipes, searchTerm, selectedCategory]);

  function showTemporaryAuthMessage() {
      setAuthMessage("Você precisa entrar na sua conta para interagir com as receitas.");

    if (authMessageTimer.current) {
      window.clearTimeout(authMessageTimer.current);
    }

    authMessageTimer.current = window.setTimeout(() => {
      setAuthMessage("");
    }, 3500);
  }

  async function handleAddRecipe(newRecipe) {
    if (!isAuthenticated) {
      showTemporaryAuthMessage();
      return;
    }

    try {
      const createdRecipe = await createRecipe(toApiRecipe(newRecipe));
      setRecipes((currentRecipes) => [normalizeRecipe(createdRecipe), ...currentRecipes]);
      setSuccessMessage("Receita publicada com sucesso na API.");
      setDataMessage("Receitas conectadas à API.");
    } catch {
      setRecipes((currentRecipes) => [newRecipe, ...currentRecipes]);
      setSuccessMessage("API indisponível. Receita publicada localmente nesta sessão.");
      setDataMessage("Usando fallback local porque a API não respondeu.");
    } finally {
      setShowForm(false);
    }
  }

  function handlePublishClick() {
    if (!isAuthenticated) {
      showTemporaryAuthMessage();
      return;
    }

    setAuthMessage("");
    setShowForm((current) => !current);
  }

  return (
    <section className="feed-page" id="receitas">
      <div className="feed-header">
        <span className="eyebrow">Comunidade</span>
        <h2>Feed de Receitas</h2>
        <p>
          Explore receitas da comunidade, encontre inspirações por ingrediente e
          publique seus preparos quando quiser participar.
        </p>
      </div>

      <div className="feed-toolbar">
        <div>
          <strong>Receitas em destaque</strong>
          <span>
            {isLoading ? "Carregando receitas..." : `${filteredRecipes.length} receita(s) encontrada(s)`}
          </span>
        </div>
        <button type="button" onClick={handlePublishClick}>
          {showForm ? "Fechar formulário" : "Publicar receita"}
        </button>
      </div>

      {!isAuthenticated && authMessage && (
        <div className="auth-required-panel">
          <div>
            <strong>Acesso necessário</strong>
            <p>{authMessage}</p>
          </div>
          <button type="button" onClick={onRequireAuth}>
            Entrar agora
          </button>
        </div>
      )}

      <div className={`feed-grid ${showForm ? "has-form" : ""}`}>
        {showForm && (
          <div className="publish-panel">
            <RecipeForm onAddRecipe={handleAddRecipe} successMessage={successMessage} />
          </div>
        )}

        <div className="recipes-area">
          {isLoading && <p className="recipe-message loading">Buscando receitas na API...</p>}
          {dataMessage && !isLoading && <p className="recipe-message info">{dataMessage}</p>}
          {successMessage && !showForm && <p className="recipe-message success">{successMessage}</p>}
          <RecipeFilter
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            categories={categories}
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
          />
          <RecipeList
            recipes={filteredRecipes}
            currentUser={currentUser}
            onRequireAuth={onRequireAuth}
          />
        </div>
      </div>
    </section>
  );
}

export default FeedPage;
