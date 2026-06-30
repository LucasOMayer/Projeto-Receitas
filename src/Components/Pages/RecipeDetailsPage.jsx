import "../Recipes/Recipes.css";

function RecipeDetailsPage({ recipe, onBackToFeed }) {
  if (!recipe) {
    return (
      <section className="recipe-details-page">
        <div className="recipe-details-shell">
          <button className="back-feed-button" type="button" onClick={onBackToFeed}>
            Voltar para o feed
          </button>
          <p className="recipe-message error">Receita não encontrada.</p>
        </div>
      </section>
    );
  }

  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : String(recipe.ingredients || "").split(/,|\n/).map((item) => item.trim()).filter(Boolean);
  const steps = String(recipe.preparation || "")
    .split(/\n+/)
    .map((step) => step.trim())
    .filter(Boolean);

  return (
    <section className="recipe-details-page">
      <div className="recipe-details-shell">
        <button className="back-feed-button" type="button" onClick={onBackToFeed}>
          Voltar para o feed
        </button>

        <article className="recipe-details-card">
          <img src={recipe.imageUrl} alt={recipe.name} />

          <div className="recipe-details-content">
            <span className="recipe-category">{recipe.category}</span>
            <h1>{recipe.name}</h1>
            <p className="recipe-author">por {recipe.author}</p>

            <div className="recipe-times">
              <span>Preparo: {recipe.prepTime}</span>
              <span>Espera: {recipe.waitTime}</span>
            </div>

            <section>
              <h2>Ingredientes</h2>
              <ul>
                {ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2>Modo de preparo</h2>
              <ol>
                {(steps.length > 0 ? steps : [recipe.preparation]).map((step, index) => (
                  <li key={`${step}-${index}`}>{step}</li>
                ))}
              </ol>
            </section>

            <section>
              <h2>Comentários</h2>
              {recipe.comments?.length ? (
                <ul>
                  {recipe.comments.map((comment) => (
                    <li key={comment.id || comment.content}>{comment.content || comment}</li>
                  ))}
                </ul>
              ) : (
                <p>Ainda não há comentários nesta receita.</p>
              )}
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}

export default RecipeDetailsPage;
