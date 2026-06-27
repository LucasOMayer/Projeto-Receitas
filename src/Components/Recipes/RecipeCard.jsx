import { useState } from "react";

const fallbackImage =
  "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=900&q=80";

function RecipeCard({ recipe }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const likesCount = liked ? recipe.likes + 1 : recipe.likes;
  const preparationSummary =
    recipe.preparation.length > 130
      ? `${recipe.preparation.slice(0, 130)}...`
      : recipe.preparation;

  function handleCommentSubmit(event) {
    event.preventDefault();

    if (!commentText.trim()) {
      return;
    }

    setComments((currentComments) => [commentText.trim(), ...currentComments]);
    setCommentText("");
  }

  return (
    <article className="recipe-card">
      <img
        className="recipe-image"
        src={recipe.imageUrl || fallbackImage}
        alt={recipe.name}
      />

      <div className="recipe-card-content">
        <div className="recipe-card-header">
          <span className="recipe-category">{recipe.category}</span>
          <h3>{recipe.name}</h3>
          <p>por {recipe.author}</p>
        </div>

        <div className="recipe-times">
          <span>Preparo: {recipe.prepTime}</span>
          <span>Espera: {recipe.waitTime}</span>
        </div>

        <div className="recipe-section">
          <strong>Ingredientes</strong>
          <p>{recipe.ingredients.join(", ")}</p>
        </div>

        <div className="recipe-section">
          <strong>Modo de preparo</strong>
          <p>{preparationSummary}</p>
        </div>

        <div className="recipe-actions">
          <button
            className={liked ? "is-active" : ""}
            type="button"
            onClick={() => setLiked((current) => !current)}
          >
            {liked ? "Curtido" : "Curtir"} ({likesCount})
          </button>
          <button
            className={saved ? "is-active" : ""}
            type="button"
            onClick={() => setSaved((current) => !current)}
          >
            {saved ? "Salvo" : "Salvar"}
          </button>
        </div>

        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <label className="sr-only" htmlFor={`comment-${recipe.id}`}>
            Comentario
          </label>
          <input
            id={`comment-${recipe.id}`}
            type="text"
            placeholder="Adicionar comentario"
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>

        {comments.length > 0 && (
          <ul className="comment-list">
            {comments.map((comment, index) => (
              <li key={`${comment}-${index}`}>{comment}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export default RecipeCard;
