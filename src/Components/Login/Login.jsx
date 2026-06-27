import { useState } from "react";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import bannerPrincipal from "../../assets/bannerPrincipal.png";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value, checked, type } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage("Preencha email e senha para continuar.");
      return;
    }

    setMessage("Login validado no front. Banco de dados entra na proxima etapa.");
  }

  return (
    <section className="login-page" id="login">
      <div className="login-background" aria-hidden="true">
        <img src={bannerPrincipal} alt="" />
      </div>

      <div className="login-content">
        <div className="login-copy">
          <span className="eyebrow">Recipe Feed</span>
          <h1>Entre para salvar e descobrir receitas.</h1>
          <p>
            Login basico sem banco de dados por enquanto, pronto para conectar com
            autenticacao real depois.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <FiUser aria-hidden="true" />
            <div>
              <h2>Acesse sua conta</h2>
              <p>Use seu email e senha para continuar.</p>
            </div>
          </div>

          <label className="field" htmlFor="email">
            <span>Email</span>
            <div className="input-wrapper">
              <FiMail aria-hidden="true" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="usuario@email.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
          </label>

          <label className="field" htmlFor="password">
            <span>Senha</span>
            <div className="input-wrapper">
              <FiLock aria-hidden="true" />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Sua senha"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>
          </label>

          <div className="form-row">
            <label className="remember-option">
              <input
                name="remember"
                type="checkbox"
                checked={formData.remember}
                onChange={handleChange}
              />
              Lembrar senha
            </label>
            <a href="#login">Esqueci minha senha</a>
          </div>

          <button className="submit-button" type="submit">
            Entrar
          </button>

          {message && <p className="form-message">{message}</p>}

          <p className="register-text">
            Nao tem uma conta? <a href="#login">Cadastre-se</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
