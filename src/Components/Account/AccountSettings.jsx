import { useState } from "react";

function AccountSettings({ user, onUpdateUser }) {
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio,
    email: user.email,
    currentPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name: formData.name,
      username: formData.username,
      bio: formData.bio,
      email: formData.email,
    });

    setMessage("Alterações salvas no front-end. A integração com banco será feita depois.");
    setFormData((currentData) => ({
      ...currentData,
      currentPassword: "",
      newPassword: "",
    }));
  }

  return (
    <form className="account-card account-settings" onSubmit={handleSubmit}>
      <div className="account-section-heading">
        <h2>Configurações da conta</h2>
        <p>Atualize dados públicos e privados de forma simulada.</p>
      </div>

      <fieldset>
        <legend>Informações públicas</legend>
        <label htmlFor="account-name">
          Nome exibido
          <input id="account-name" name="name" value={formData.name} onChange={handleChange} />
        </label>

        <label htmlFor="account-username">
          Nome de usuário
          <input
            id="account-username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="account-bio">
          Biografia
          <textarea id="account-bio" name="bio" value={formData.bio} onChange={handleChange} rows="4" />
        </label>
      </fieldset>

      <fieldset>
        <legend>Informações privadas</legend>
        <label htmlFor="account-email">
          Email
          <input
            id="account-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <div className="account-form-grid">
          <label htmlFor="account-current-password">
            Senha atual
            <input
              id="account-current-password"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Senha atual"
            />
          </label>

          <label htmlFor="account-new-password">
            Nova senha
            <input
              id="account-new-password"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Nova senha"
            />
          </label>
        </div>
      </fieldset>

      <button className="account-save-button" type="submit">
        Salvar alterações
      </button>

      {message && <p className="account-message">{message}</p>}
    </form>
  );
}

export default AccountSettings;
