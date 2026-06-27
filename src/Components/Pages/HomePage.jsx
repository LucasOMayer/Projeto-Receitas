function HomePage({ onLoginClick }) {
  return (
    <section className="home-page" id="home">
      <div className="home-content">
        <span className="eyebrow">Rede social de gastronomia</span>
        <h1>Receitas Food</h1>
        <p>
          Compartilhe receitas, descubra novos sabores e salve seus preparos
          favoritos em uma rede feita para quem ama cozinhar.
        </p>
        <div className="home-actions">
          <a className="home-button" href="#receitas">
            Ver receitas
          </a>
          <button className="home-button secondary" type="button" onClick={onLoginClick}>
            Entrar ou acessar conta
          </button>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
