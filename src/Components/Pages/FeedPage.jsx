import { useMemo, useState } from "react";
import RecipeFilter from "../Recipes/RecipeFilter";
import RecipeForm from "../Recipes/RecipeForm";
import RecipeList from "../Recipes/RecipeList";
import { recipesMock } from "../Recipes/recipesMock";
import "../Recipes/Recipes.css";

function FeedPage() {
  const [recipes, setRecipes] = useState(recipesMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

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
    setRecipes((currentRecipes) => [newRecipe, ...currentRecipes]);
    setSuccessMessage("Receita publicada com sucesso.");
    setShowForm(false);
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
        <button type="button" onClick={() => setShowForm((current) => !current)}>
          {showForm ? "Fechar formulario" : "Publicar receita"}
        </button>
      </div>

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
          <RecipeList recipes={filteredRecipes} />
        </div>
      </div>
    </section>
  );
}

export default FeedPage;
