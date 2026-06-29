import "./Account.css";
import AccountProfile from "./AccountProfile";
import AccountSettings from "./AccountSettings";
import AccountStats from "./AccountStats";

function AccountPage({ user, onBackHome, onLogout, onUpdateUser }) {
  return (
    <section className="account-page">
      <div className="account-shell">
        <div className="account-topbar">
          <button type="button" onClick={onBackHome}>
            Voltar para início
          </button>
          <button className="logout-button" type="button" onClick={onLogout}>
            Sair da conta
          </button>
        </div>

        <AccountProfile user={user} />
        <AccountStats />
        <AccountSettings user={user} onUpdateUser={onUpdateUser} />
      </div>
    </section>
  );
}

export default AccountPage;
