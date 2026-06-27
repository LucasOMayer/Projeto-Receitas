import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Navegacao principal">
        <a className="brand" href="#login" onClick={closeMenu}>
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
          <a href="#login" onClick={closeMenu}>
            Inicio
          </a>
          <a href="#receitas" onClick={closeMenu}>
            Receitas
          </a>
          <a href="#amigos" onClick={closeMenu}>
            Amigos
          </a>
          <a href="#footer" onClick={closeMenu}>
            Contato
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
