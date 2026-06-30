import { useRef, useState } from "react";

const fallbackImage =
  "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=900&q=80";

function RecipeCard({ recipe, currentUser, onRequireAuth, onSelectRecipe, onDeleteRecipe }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [authMessage, setAuthMessage] = useState("");
  const authMessageTimer = useRef(null);
  const isAuthenticated = Boolean(currentUser);
  const isAuthor = Boolean(currentUser?.id && recipe.userId && Number(currentUser.id) === Number(recipe.userId));

  const likesCount = liked ? recipe.likes + 1 : recipe.likes;
  const preparationSummary =
    recipe.preparation.length > 130
      ? `${recipe.preparation.slice(0, 130)}...`
      : recipe.preparation;

  function requireAuth() {
    setAuthMessage("Você precisa entrar na sua conta para interagir com as receitas.");

    if (authMessageTimer.current) {
      window.clearTimeout(authMessageTimer.current);
    }

    authMessageTimer.current = window.setTimeout(() => {
      setAuthMessage("");
    }, 3500);
  }

  function handleLikeClick() {
    if (!isAuthenticated) {
      requireAuth();
      return;
    }

    setAuthMessage("");
    setLiked((current) => !current);
  }

  function handleSaveClick() {
    if (!isAuthenticated) {
      requireAuth();
      return;
    }

    setAuthMessage("");
    setSaved((current) => !current);
  }

  function handleCommentSubmit(event) {
    event.preventDefault();

    if (!isAuthenticated) {
      requireAuth();
      return;
    }

    if (!commentText.trim()) {
      return;
    }

    setAuthMessage("");
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
            onClick={handleLikeClick}
          >
            {liked ? "Receita curtida" : "Curtir receita"} ({likesCount})
          </button>
          <button
            className={saved ? "is-active" : ""}
            type="button"
            onClick={handleSaveClick}
          >
            {saved ? "Receita salva" : "Salvar receita"}
          </button>
          <button type="button" onClick={() => onSelectRecipe(recipe)}>
            Ver receita completa
          </button>
          {isAuthor && (
            <button className="danger-button" type="button" onClick={() => onDeleteRecipe(recipe)}>
              Excluir receita
            </button>
          )}
        </div>

        {!isAuthenticated && authMessage && (
          <div className="card-auth-note">
            <span>{authMessage}</span>
            <button type="button" onClick={onRequireAuth}>
              Entrar agora
            </button>
          </div>
        )}

        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <label className="sr-only" htmlFor={`comment-${recipe.id}`}>
            Comentário
          </label>
          <input
            id={`comment-${recipe.id}`}
            type="text"
            placeholder="Escreva um comentário sobre essa receita..."
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
