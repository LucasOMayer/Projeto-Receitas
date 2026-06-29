import { useState } from "react";
import bannerPrincipal from "../../assets/bannerPrincipal.png";
import ForgotPasswordForm from "./ForgotPasswordForm";
import "./Auth.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const authContent = {
  login: {
    label: "Acesso",
    title: "Acesse sua conta",
    text: "Entre para salvar receitas, comentar preparos e acompanhar seus cozinheiros favoritos.",
  },
  register: {
    label: "Nova conta",
    title: "Crie sua conta",
    text: "Publique suas receitas, monte seu caderno de favoritos e participe da comunidade Receitas Food.",
  },
  forgot: {
    label: "Recuperação",
    title: "Recuperar acesso",
    text: "Informe seu email para receber as instruções de recuperação da sua conta.",
  },
};

function AuthPage({ onBackHome, onLoginSuccess }) {
  const [activeForm, setActiveForm] = useState("login");
  const [loginNotice, setLoginNotice] = useState("");
  const content = authContent[activeForm];

  function showLogin(message = "") {
    setActiveForm("login");
    setLoginNotice(message);
  }

  return (
    <section className="auth-page" id="auth">
      <div className="auth-background" aria-hidden="true">
        <img src={bannerPrincipal} alt="" />
      </div>

      <div className="auth-shell">
        <button className="auth-back-button" type="button" onClick={onBackHome}>
          Voltar para início
        </button>

        <div className="auth-layout">
          <aside className="auth-copy">
            <span className="eyebrow">{content.label}</span>
            <h1>{content.title}</h1>
            <p>{content.text}</p>
            <div className="auth-highlights">
              <span>Receitas favoritas</span>
              <span>Comentários</span>
              <span>Comunidade</span>
            </div>
          </aside>

          <div className="auth-card">
            {activeForm === "login" && (
              <LoginForm
                notice={loginNotice}
                onLoginSuccess={onLoginSuccess}
                onShowRegister={() => {
                  setLoginNotice("");
                  setActiveForm("register");
                }}
                onShowForgot={() => {
                  setLoginNotice("");
                  setActiveForm("forgot");
                }}
              />
            )}

            {activeForm === "register" && (
              <RegisterForm
                onRegisterSuccess={() =>
                  showLogin("Cadastro realizado com sucesso. Agora faça login para continuar.")
                }
                onShowLogin={() => showLogin()}
              />
            )}

            {activeForm === "forgot" && (
              <ForgotPasswordForm onShowLogin={() => showLogin()} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthPage;
