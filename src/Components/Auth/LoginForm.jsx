import { useState } from "react";
import { FiLock, FiMail } from "react-icons/fi";
import { loginUser } from "../../services/authApi";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function LoginForm({ notice, onLoginSuccess, onShowRegister, onShowForgot }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  function handleChange(event) {
    const { name, value, checked, type } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.email.trim()) {
      setMessage("Informe seu email para continuar.");
      setMessageType("error");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setMessage("Digite um email valido.");
      setMessageType("error");
      return;
    }

    if (!formData.password.trim()) {
      setMessage("Informe sua senha.");
      setMessageType("error");
      return;
    }

    const response = await loginUser(formData);
    const user = {
      name: response.data?.user?.name || "Usuario Receitas Food",
      email: formData.email,
    };

    setMessage("Login validado no front-end. Integracao com banco sera feita na proxima etapa.");
    setMessageType("success");

    window.setTimeout(() => {
      onLoginSuccess(user);
    }, 500);
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-form-heading">
        <span>Login</span>
        <h2>Acesse sua conta</h2>
        <p>Entre para salvar receitas, comentar preparos e acompanhar seus cozinheiros favoritos.</p>
      </div>

      {notice && <p className="auth-message success">{notice}</p>}

      <label className="auth-field" htmlFor="auth-login-email">
        Email
        <div className="auth-input">
          <FiMail aria-hidden="true" />
          <input
            id="auth-login-email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>
      </label>

      <label className="auth-field" htmlFor="auth-login-password">
        Senha
        <div className="auth-input">
          <FiLock aria-hidden="true" />
          <input
            id="auth-login-password"
            name="password"
            type="password"
            placeholder="Sua senha"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </div>
      </label>

      <div className="auth-row">
        <label className="auth-check">
          <input
            name="remember"
            type="checkbox"
            checked={formData.remember}
            onChange={handleChange}
          />
          Lembrar acesso
        </label>
        <button className="auth-link-button" type="button" onClick={onShowForgot}>
          Esqueci minha senha
        </button>
      </div>

      <button className="auth-submit" type="submit">
        Entrar
      </button>

      {message && <p className={`auth-message ${messageType}`}>{message}</p>}

      <p className="auth-switch">
        Ainda nao tem conta?{" "}
        <button type="button" onClick={onShowRegister}>
          Criar conta
        </button>
      </p>
    </form>
  );
}

export default LoginForm;
