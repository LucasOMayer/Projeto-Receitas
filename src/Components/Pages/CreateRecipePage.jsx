import { useState } from "react";
import { createRecipe, uploadImage } from "../../services/api";
import "../Recipes/Recipes.css";

const fallbackImage =
  "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=900&q=80";

const initialForm = {
  title: "",
  category: "",
  ingredients: "",
  preparation: "",
  preparationTime: "",
  waitingTime: "",
  imageUrl: "",
  imageFile: null,
};

function CreateRecipePage({ currentUser, onBackToFeed, onRequireAuth }) {
  const [formData, setFormData] = useState(initialForm);
  const [previewUrl, setPreviewUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setFormData((currentData) => ({
      ...currentData,
      imageFile: file,
    }));
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!currentUser) {
      setMessage("Você precisa entrar na sua conta para publicar uma receita.");
      return;
    }

    if (
      !formData.title.trim() ||
      !formData.category.trim() ||
      !formData.ingredients.trim() ||
      !formData.preparation.trim()
    ) {
      setMessage("Preencha título, categoria, ingredientes e modo de preparo.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      let imageUrl = formData.imageUrl.trim();

      if (formData.imageFile) {
        imageUrl = await uploadImage(formData.imageFile);
      }

      await createRecipe({
        userId: currentUser.id,
        title: formData.title.trim(),
        author: currentUser.name,
        category: formData.category.trim(),
        ingredients: formData.ingredients
          .split(/,|\n/)
          .map((ingredient) => ingredient.trim())
          .filter(Boolean),
        preparation: formData.preparation.trim(),
        preparationTime: formData.preparationTime.trim() || "Não informado",
        waitingTime: formData.waitingTime.trim() || "Não informado",
        imageUrl: imageUrl || fallbackImage,
      });

      onBackToFeed();
    } catch (error) {
      setMessage(error.message || "Não foi possível publicar a receita.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="create-recipe-page">
      <div className="create-recipe-shell">
        <button className="back-feed-button" type="button" onClick={onBackToFeed}>
          Voltar para o feed
        </button>

        <div className="create-recipe-layout">
          <div className="create-recipe-copy">
            <span className="eyebrow">Publicação</span>
            <h1>Publique uma nova receita</h1>
            <p>Compartilhe ingredientes, preparo e uma imagem bonita para a comunidade.</p>

            {!currentUser && (
              <div className="auth-required-panel">
                <div>
                  <strong>Acesso necessário</strong>
                  <p>Você precisa entrar na sua conta para publicar uma receita.</p>
                </div>
                <button type="button" onClick={onRequireAuth}>
                  Entrar agora
                </button>
              </div>
            )}
          </div>

          <form className="recipe-form create-recipe-form" onSubmit={handleSubmit}>
            <h3>Dados da receita</h3>

            <label htmlFor="create-title">
              Título da receita
              <input id="create-title" name="title" value={formData.title} onChange={handleChange} />
            </label>

            <label htmlFor="create-category">
              Categoria
              <input id="create-category" name="category" value={formData.category} onChange={handleChange} />
            </label>

            <label htmlFor="create-ingredients">
              Ingredientes
              <textarea
                id="create-ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                rows="4"
                placeholder="Separe por vírgula ou linha"
              />
            </label>

            <label htmlFor="create-preparation">
              Modo de preparo
              <textarea
                id="create-preparation"
                name="preparation"
                value={formData.preparation}
                onChange={handleChange}
                rows="6"
              />
            </label>

            <div className="recipe-form-row">
              <label htmlFor="create-prep-time">
                Tempo de preparo
                <input
                  id="create-prep-time"
                  name="preparationTime"
                  value={formData.preparationTime}
                  onChange={handleChange}
                  placeholder="30 min"
                />
              </label>

              <label htmlFor="create-wait-time">
                Tempo de espera
                <input
                  id="create-wait-time"
                  name="waitingTime"
                  value={formData.waitingTime}
                  onChange={handleChange}
                  placeholder="1 h"
                />
              </label>
            </div>

            <label htmlFor="create-image-file">
              Imagem por upload
              <input id="create-image-file" type="file" accept="image/*" onChange={handleFileChange} />
            </label>

            <label htmlFor="create-image-url">
              URL da imagem
              <input
                id="create-image-url"
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
            </label>

            {(previewUrl || formData.imageUrl) && (
              <img className="create-preview" src={previewUrl || formData.imageUrl} alt="Prévia da receita" />
            )}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Publicando..." : "Publicar receita"}
            </button>

            {message && <p className="recipe-message error">{message}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreateRecipePage;
