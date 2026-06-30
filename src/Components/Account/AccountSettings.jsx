import { useState } from "react";
import { updateUser, updateUserPassword, uploadImage } from "../../services/userApi";

function AccountSettings({ user, onUpdateUser }) {
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio,
    email: user.email,
    currentPassword: "",
    newPassword: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatarUrl || "");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");

    if (!user.id) {
      setErrorMessage("Não foi possível identificar o usuário logado.");
      return;
    }

    if ((formData.currentPassword && !formData.newPassword) || (!formData.currentPassword && formData.newPassword)) {
      setErrorMessage("Preencha a senha atual e a nova senha para alterar sua senha.");
      return;
    }

    try {
      setIsSaving(true);

      const imageUrl = avatarFile ? await uploadImage(avatarFile) : avatarPreview;
      const updatedUser = await updateUser(user.id, {
        name: formData.name,
        username: formData.username,
        bio: formData.bio,
        email: formData.email,
        avatarUrl: imageUrl,
      });

      onUpdateUser(updatedUser);
      setAvatarFile(null);
      setAvatarPreview(updatedUser.avatarUrl || "");

      let successMessage = "Perfil atualizado com sucesso.";

      if (formData.currentPassword && formData.newPassword) {
        await updateUserPassword(user.id, {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        });
        successMessage = "Perfil atualizado com sucesso. Senha atualizada com sucesso.";
      }

      setMessage(successMessage);
      setFormData((currentData) => ({
        ...currentData,
        currentPassword: "",
        newPassword: "",
      }));
    } catch (error) {
      const text =
        error.message === "Senha atual incorreta."
          ? "Senha atual incorreta."
          : error.message || "Não foi possível atualizar o perfil.";

      setErrorMessage(text);
    } finally {
      setIsSaving(false);
    }
  }

  function handleAvatarChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setAvatarFile(file);
      setAvatarPreview(reader.result);
      setMessage("");
      setErrorMessage("");
    };

    reader.readAsDataURL(file);
  }

  const avatarInitial = (formData.name || user.name || "U").charAt(0).toUpperCase();

  return (
    <form className="account-card account-settings" onSubmit={handleSubmit}>
      <div className="account-section-heading">
        <h2>Configurações da conta</h2>
        <p>Atualize suas informações de perfil e acesso.</p>
      </div>

      <fieldset>
        <legend>Informações públicas</legend>

        <div className="account-avatar-editor">
          <div className="account-avatar account-avatar-preview" aria-hidden="true">
            {avatarPreview ? <img src={avatarPreview} alt="" /> : <span>{avatarInitial}</span>}
          </div>

          <label htmlFor="account-avatar">
            Foto de perfil
            <input id="account-avatar" type="file" accept="image/*" onChange={handleAvatarChange} />
          </label>
        </div>

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

      <button className="account-save-button" type="submit" disabled={isSaving}>
        {isSaving ? "Salvando..." : "Salvar alterações"}
      </button>

      {message && <p className="account-message">{message}</p>}
      {errorMessage && <p className="account-message account-message-error">{errorMessage}</p>}
    </form>
  );
}

export default AccountSettings;
