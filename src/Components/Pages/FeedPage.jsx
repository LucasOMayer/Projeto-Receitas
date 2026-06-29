import { useMemo, useState } from "react";
import RecipeFilter from "../Recipes/RecipeFilter";
import RecipeForm from "../Recipes/RecipeForm";
import RecipeList from "../Recipes/RecipeList";
import { recipesMock } from "../Recipes/recipesMock";
import "../Recipes/Recipes.css";

function FeedPage({ currentUser, onRequireAuth }) {
  const [recipes, setRecipes] = useState(recipesMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [successMessage, setSuccessMessage] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const isAuthenticated = Boolean(currentUser);

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

  function handleAddRecipe(newRecipe) {
    if (!isAuthenticated) {
      setAuthMessage("Voce precisa entrar na sua conta para interagir com as receitas.");
      onRequireAuth();
      return;
    }

    setRecipes((currentRecipes) => [newRecipe, ...currentRecipes]);
    setSuccessMessage("Receita publicada com sucesso.");
    setShowForm(false);
  }

  function handlePublishClick() {
    if (!isAuthenticated) {
      setAuthMessage("Voce precisa entrar na sua conta para interagir com as receitas.");
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
          Explore receitas da comunidade, encontre inspiracoes por ingrediente e
          publique seus preparos quando quiser participar.
        </p>
      </div>

      <div className="feed-toolbar">
        <div>
          <strong>Receitas em destaque</strong>
          <span>{filteredRecipes.length} receita(s) encontrada(s)</span>
        </div>
        <button type="button" onClick={handlePublishClick}>
          {showForm ? "Fechar formulario" : "Publicar receita"}
        </button>
      </div>

      {!isAuthenticated && (
        <div className="auth-required-panel">
          <div>
            <strong>Entre para comentar e salvar suas receitas favoritas.</strong>
            <p>{authMessage || "Voce precisa entrar na sua conta para interagir com as receitas."}</p>
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
