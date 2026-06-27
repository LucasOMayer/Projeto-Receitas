import { useState } from "react";
import bannerPrincipal from "../../assets/bannerPrincipal.png";
import ForgotPasswordForm from "./ForgotPasswordForm";
import "./Auth.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const authContent = {
  login: {
    label: "Acesso",
    title: "Sua cozinha social em um so lugar.",
    text: "Entre para salvar receitas, comentar preparos e acompanhar seus cozinheiros favoritos.",
  },
  register: {
    label: "Nova conta",
    title: "Publique suas melhores receitas.",
    text: "Crie seu perfil e participe da comunidade gastronomica do Receitas Food.",
  },
  forgot: {
    label: "Recuperacao",
    title: "Recupere seu acesso com tranquilidade.",
    text: "Enviaremos as proximas instrucoes para o email informado, quando a integracao real estiver ativa.",
  },
};

function AuthPage({ onBackHome }) {
  const [activeForm, setActiveForm] = useState("login");
  const content = authContent[activeForm];

  return (
    <section className="auth-page" id="auth">
      <div className="auth-background" aria-hidden="true">
        <img src={bannerPrincipal} alt="" />
      </div>

      <div className="auth-shell">
        <button className="auth-back-button" type="button" onClick={onBackHome}>
          Voltar para inicio
        </button>

        <div className="auth-layout">
          <aside className="auth-copy">
            <span className="eyebrow">{content.label}</span>
            <h1>{content.title}</h1>
            <p>{content.text}</p>
            <div className="auth-highlights">
              <span>Receitas favoritas</span>
              <span>Comentarios</span>
              <span>Comunidade</span>
            </div>
          </aside>

          <div className="auth-card">
            <div className="auth-tabs" aria-label="Opcoes de autenticacao">
              <button
                className={activeForm === "login" ? "is-active" : ""}
                type="button"
                onClick={() => setActiveForm("login")}
              >
                Login
              </button>
              <button
                className={activeForm === "register" ? "is-active" : ""}
                type="button"
                onClick={() => setActiveForm("register")}
              >
                Cadastro
              </button>
              <button
                className={activeForm === "forgot" ? "is-active" : ""}
                type="button"
                onClick={() => setActiveForm("forgot")}
              >
                Esqueci senha
              </button>
            </div>

            {activeForm === "login" && (
              <LoginForm
                onShowRegister={() => setActiveForm("register")}
                onShowForgot={() => setActiveForm("forgot")}
              />
            )}

            {activeForm === "register" && (
              <RegisterForm onShowLogin={() => setActiveForm("login")} />
            )}

            {activeForm === "forgot" && (
              <ForgotPasswordForm onShowLogin={() => setActiveForm("login")} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthPage;
