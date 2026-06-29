function AccountProfile({ user }) {
  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((namePart) => namePart.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <section className="account-card account-profile">
      <div className="account-avatar" aria-hidden="true">
        {user.avatarUrl ? <img src={user.avatarUrl} alt="" /> : <span>{initials}</span>}
      </div>

      <div>
        <span className="eyebrow">Minha conta</span>
        <h1>{user.name}</h1>
        <p className="account-username">@{user.username}</p>
        <p className="account-bio">{user.bio}</p>
        <p className="account-email">{user.email}</p>
      </div>
    </section>
  );
}

export default AccountProfile;
