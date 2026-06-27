import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function Header({ onHomeClick, onRecipesClick, onLoginClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleNavigation(event, callback) {
    event.preventDefault();
    closeMenu();
    callback();
  }

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Navegacao principal">
        <a className="brand" href="#home" onClick={(event) => handleNavigation(event, onHomeClick)}>
          Receitas Food
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <a href="#home" onClick={(event) => handleNavigation(event, onHomeClick)}>
            Inicio
          </a>
          <a href="#receitas" onClick={(event) => handleNavigation(event, onRecipesClick)}>
            Receitas
          </a>
          <button
            type="button"
            onClick={() => {
              closeMenu();
              onLoginClick();
            }}
          >
            Entrar
          </button>
          <a href="#footer" onClick={closeMenu}>
            Contato
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
