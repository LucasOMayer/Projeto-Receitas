function RecipeFilter({
  searchTerm,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
}) {
  return (
    <div className="recipe-filter">
      <label htmlFor="recipe-search">
        Buscar receita
        <input
          id="recipe-search"
          type="search"
          placeholder="Nome, autor ou ingrediente"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <label htmlFor="recipe-category">
        Categoria
        <select
          id="recipe-category"
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default RecipeFilter;
