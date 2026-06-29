import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { recoverPassword } from "../../services/authApi";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function ForgotPasswordForm({ onShowLogin }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      setMessage("Informe seu email para recuperar o acesso.");
      setMessageType("error");
      return;
    }

    if (!isValidEmail(email)) {
      setMessage("Digite um email valido.");
      setMessageType("error");
      return;
    }

    await recoverPassword(email);
    setMessage("Se este email estiver cadastrado, enviaremos instrucoes de recuperacao.");
    setMessageType("success");
    setEmail("");
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-form-heading">
        <span>Recuperacao</span>
        <h2>Recuperar acesso</h2>
        <p>Informe seu email para receber as instrucoes de recuperacao da sua conta.</p>
      </div>

      <label className="auth-field" htmlFor="auth-recover-email">
        Email
        <div className="auth-input">
          <FiMail aria-hidden="true" />
          <input
            id="auth-recover-email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
        </div>
      </label>

      <button className="auth-submit" type="submit">
        Enviar instrucoes
      </button>

      {message && <p className={`auth-message ${messageType}`}>{message}</p>}

      <p className="auth-switch">
        Lembrou a senha?{" "}
        <button type="button" onClick={onShowLogin}>
          Voltar para login
        </button>
      </p>
    </form>
  );
}

export default ForgotPasswordForm;
