import RecipeCard from "./RecipeCard";

function RecipeList({ recipes, currentUser, onRequireAuth, onSelectRecipe, onDeleteRecipe }) {
  if (recipes.length === 0) {
    return (
      <div className="empty-recipes">
        <h3>Nenhuma receita encontrada</h3>
        <p>Tente buscar por outro termo ou selecionar outra categoria.</p>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          currentUser={currentUser}
          onRequireAuth={onRequireAuth}
          onSelectRecipe={onSelectRecipe}
          onDeleteRecipe={onDeleteRecipe}
        />
      ))}
    </div>
  );
}

export default RecipeList;
