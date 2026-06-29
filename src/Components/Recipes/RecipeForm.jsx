import { useState } from "react";

const initialFormData = {
  name: "",
  author: "",
  category: "",
  ingredients: "",
  preparation: "",
  prepTime: "",
  waitTime: "",
  imageUrl: "",
};

function RecipeForm({ onAddRecipe, successMessage }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.author.trim() ||
      !formData.category.trim() ||
      !formData.ingredients.trim() ||
      !formData.preparation.trim()
    ) {
      setErrorMessage("Preencha nome, autor, categoria, ingredientes e preparo.");
      return;
    }

    const ingredients = formData.ingredients
      .split(/,|\n/)
      .map((ingredient) => ingredient.trim())
      .filter(Boolean);

    await onAddRecipe({
      id: Date.now(),
      name: formData.name.trim(),
      author: formData.author.trim(),
      category: formData.category.trim(),
      ingredients,
      preparation: formData.preparation.trim(),
      prepTime: formData.prepTime.trim() || "Nao informado",
      waitTime: formData.waitTime.trim() || "Nao informado",
      imageUrl: formData.imageUrl.trim(),
      likes: 0,
    });

    setFormData(initialFormData);
    setErrorMessage("");
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <h3>Publicar receita</h3>

      <label htmlFor="recipe-name">
        Nome da receita
        <input
          id="recipe-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ex: Bolo de cenoura"
        />
      </label>

      <label htmlFor="recipe-author">
        Autor
        <input
          id="recipe-author"
          name="author"
          type="text"
          value={formData.author}
          onChange={handleChange}
          placeholder="Seu nome"
        />
      </label>

      <label htmlFor="recipe-form-category">
        Categoria
        <input
          id="recipe-form-category"
          name="category"
          type="text"
          value={formData.category}
          onChange={handleChange}
          placeholder="Massas, doces, saladas..."
        />
      </label>

      <label htmlFor="recipe-ingredients">
        Ingredientes
        <textarea
          id="recipe-ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="Separe por virgula ou linha"
          rows="4"
        />
      </label>

      <label htmlFor="recipe-preparation">
        Modo de preparo
        <textarea
          id="recipe-preparation"
          name="preparation"
          value={formData.preparation}
          onChange={handleChange}
          placeholder="Descreva o preparo"
          rows="5"
        />
      </label>

      <div className="recipe-form-row">
        <label htmlFor="recipe-prep-time">
          Tempo de preparo
          <input
            id="recipe-prep-time"
            name="prepTime"
            type="text"
            value={formData.prepTime}
            onChange={handleChange}
            placeholder="30 min"
          />
        </label>

        <label htmlFor="recipe-wait-time">
          Tempo de espera
          <input
            id="recipe-wait-time"
            name="waitTime"
            type="text"
            value={formData.waitTime}
            onChange={handleChange}
            placeholder="1 h"
          />
        </label>
      </div>

      <label htmlFor="recipe-image">
        URL da imagem
        <input
          id="recipe-image"
          name="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://..."
        />
      </label>

      <button type="submit">Publicar receita</button>

      {errorMessage && <p className="recipe-message error">{errorMessage}</p>}
      {successMessage && !errorMessage && <p className="recipe-message success">{successMessage}</p>}
    </form>
  );
}

export default RecipeForm;
