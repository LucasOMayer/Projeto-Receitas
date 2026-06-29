import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function Header({ currentUser, onHomeClick, onRecipesClick, onLoginClick, onAccountClick, onLogout }) {
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

        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <a href="#home" onClick={(event) => handleNavigation(event, onHomeClick)}>
            Inicio
          </a>
          <a href="#receitas" onClick={(event) => handleNavigation(event, onRecipesClick)}>
            Receitas
          </a>
          <a href="#footer" onClick={closeMenu}>
            Contato
          </a>
        </div>

        <div className="header-actions">
          {currentUser ? (
            <>
              <button className="header-login-button" type="button" onClick={onAccountClick}>
                Minha conta
              </button>
              <button className="header-logout-button" type="button" onClick={onLogout}>
                Sair
              </button>
            </>
          ) : (
            <button className="header-login-button" type="button" onClick={onLoginClick}>
              Entrar
            </button>
          )}

          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
