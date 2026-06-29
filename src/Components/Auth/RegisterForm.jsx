import { useState } from "react";
import { FiAtSign, FiLock, FiMail, FiUser } from "react-icons/fi";
import { registerUser } from "../../services/authApi";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function RegisterForm({ onRegisterSuccess, onShowLogin }) {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
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

    if (
      !formData.fullName.trim() ||
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      setMessage("Preencha todos os campos obrigatórios.");
      setMessageType("error");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setMessage("Digite um email válido.");
      setMessageType("error");
      return;
    }

    if (formData.password.length < 6) {
      setMessage("A senha precisa ter no minimo 6 caracteres.");
      setMessageType("error");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("A senha e a confirmação precisam ser iguais.");
      setMessageType("error");
      return;
    }

    if (!formData.terms) {
      setMessage("Aceite os termos para criar sua conta.");
      setMessageType("error");
      return;
    }

    try {
      await registerUser(formData);
      setMessage("Cadastro realizado com sucesso. Agora faça login.");
      setMessageType("success");
      setFormData({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
      });

      window.setTimeout(() => {
        onRegisterSuccess();
      }, 700);
    } catch (error) {
      setMessage(error.message || "Não foi possível criar a conta.");
      setMessageType("error");
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-form-heading">
        <span>Cadastro</span>
        <h2>Crie sua conta</h2>
        <p>Publique suas receitas, monte seu caderno de favoritos e participe da comunidade Receitas Food.</p>
      </div>

      <label className="auth-field" htmlFor="auth-register-name">
        Nome completo
        <div className="auth-input">
          <FiUser aria-hidden="true" />
          <input
            id="auth-register-name"
            name="fullName"
            type="text"
            placeholder="Seu nome completo"
            value={formData.fullName}
            onChange={handleChange}
            autoComplete="name"
          />
        </div>
      </label>

      <label className="auth-field" htmlFor="auth-register-username">
        Nome de usuário
        <div className="auth-input">
          <FiAtSign aria-hidden="true" />
          <input
            id="auth-register-username"
            name="username"
            type="text"
            placeholder="ex: chef_lucas"
            value={formData.username}
            onChange={handleChange}
            autoComplete="username"
          />
        </div>
      </label>

      <label className="auth-field" htmlFor="auth-register-email">
        Email
        <div className="auth-input">
          <FiMail aria-hidden="true" />
          <input
            id="auth-register-email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>
      </label>

      <div className="auth-two-columns">
        <label className="auth-field" htmlFor="auth-register-password">
          Senha
          <div className="auth-input">
            <FiLock aria-hidden="true" />
            <input
              id="auth-register-password"
              name="password"
              type="password"
              placeholder="Minimo 6 caracteres"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>
        </label>

        <label className="auth-field" htmlFor="auth-register-confirm">
          Confirmar senha
          <div className="auth-input">
            <FiLock aria-hidden="true" />
            <input
              id="auth-register-confirm"
              name="confirmPassword"
              type="password"
              placeholder="Repita a senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>
        </label>
      </div>

      <label className="auth-check">
        <input name="terms" type="checkbox" checked={formData.terms} onChange={handleChange} />
        Aceito os termos de uso do Receitas Food
      </label>

      <button className="auth-submit" type="submit">
        Criar conta
      </button>

      {message && <p className={`auth-message ${messageType}`}>{message}</p>}

      <p className="auth-switch">
        Ja tenho uma conta{" "}
        <button type="button" onClick={onShowLogin}>
          Entrar
        </button>
      </p>
    </form>
  );
}

export default RegisterForm;
