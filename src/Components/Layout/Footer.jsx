import { useState } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

function Footer({
  currentUser,
  onHomeClick,
  onRecipesClick,
  onLoginClick,
  onAccountClick,
  onCreateRecipe,
}) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  function handleNewsletterSubmit(event) {
    event.preventDefault();
    setNewsletterMessage("Email cadastrado para novidades.");
    setNewsletterEmail("");
  }

  function handleAccountClick() {
    if (currentUser) {
      onAccountClick();
      return;
    }

    onLoginClick();
  }

  return (
    <footer className="site-footer" id="footer">
      <div className="footer-content">
        <section className="footer-brand" aria-labelledby="footer-title">
          <h2 id="footer-title">Receitas Food</h2>
          <p>Uma base simples para entrar, navegar e evoluir o feed de receitas.</p>

          <div className="social-links" aria-label="Redes sociais">
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </section>

        <section aria-labelledby="footer-pages">
          <h3 id="footer-pages">Páginas</h3>
          <button type="button" onClick={currentUser ? onAccountClick : onLoginClick}>
            {currentUser ? "Minha conta" : "Entrar"}
          </button>
          <button type="button" onClick={onRecipesClick}>
            Feed de receitas
          </button>
          <button type="button" onClick={onHomeClick}>
            Início
          </button>
        </section>

        <section aria-labelledby="footer-support">
          <h3 id="footer-support">Projeto</h3>
          <button type="button" onClick={handleAccountClick}>
            Perfil
          </button>
          <button type="button" onClick={handleAccountClick}>
            Configurações
          </button>
          <button type="button" onClick={currentUser ? onCreateRecipe : onLoginClick}>
            Área de chefs
          </button>
        </section>

        <section aria-labelledby="footer-news">
          <h3 id="footer-news">Novidades</h3>
          <p>Receba avisos quando novas receitas entrarem no ar.</p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <label className="sr-only" htmlFor="newsletter-email">
              Email para novidades
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="seu@email.com"
              value={newsletterEmail}
              onChange={(event) => setNewsletterEmail(event.target.value)}
              required
            />
            <button type="submit" aria-label="Cadastrar email">
              <FiMail />
            </button>
          </form>
          {newsletterMessage && <span className="footer-message">{newsletterMessage}</span>}
        </section>
      </div>

      <div className="footer-copy">&copy; 2026 Receitas Food. Todos os direitos reservados.</div>
    </footer>
  );
}

export default Footer;
