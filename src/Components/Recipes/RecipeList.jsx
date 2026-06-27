import RecipeCard from "./RecipeCard";

function RecipeList({ recipes }) {
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
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeList;
