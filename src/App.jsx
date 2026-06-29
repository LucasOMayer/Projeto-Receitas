import { useState } from "react";
import "./App.css";
import AccountPage from "./Components/Account/AccountPage";
import AuthPage from "./Components/Auth/AuthPage";
import Layout from "./Components/Layout/Layout";
import FeedPage from "./Components/Pages/FeedPage";
import HomePage from "./Components/Pages/HomePage";

function App() {
  const [view, setView] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);

  function showSection(sectionId) {
    setView("home");

    window.setTimeout(() => {
      document.querySelector(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  function showAuth() {
    setView("auth");

    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }

  function handleLoginSuccess(user) {
    setCurrentUser({
      name: user.name || "Usuario Receitas Food",
      username: user.username || "chef_receitas",
      email: user.email,
      bio: user.bio || "Apaixonado por receitas caseiras, sabores simples e novas ideias na cozinha.",
      avatarUrl: user.avatarUrl || "",
    });
    showSection("#home");
  }

  function showAccount() {
    setView("account");

    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }

  function handleLogout() {
    setCurrentUser(null);
    showSection("#home");
  }

  function handleUpdateUser(updatedData) {
    setCurrentUser((user) => ({
      ...user,
      ...updatedData,
    }));
  }

  return (
    <Layout
      onHomeClick={() => showSection("#home")}
      onRecipesClick={() => showSection("#receitas")}
      onLoginClick={showAuth}
      onAccountClick={showAccount}
      onLogout={handleLogout}
      currentUser={currentUser}
    >
      {view === "home" ? (
        <>
          <HomePage onLoginClick={showAuth} />
          <FeedPage currentUser={currentUser} onRequireAuth={showAuth} />
        </>
      ) : view === "auth" ? (
        <AuthPage
          onBackHome={() => showSection("#home")}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : currentUser ? (
        <AccountPage
          user={currentUser}
          onBackHome={() => showSection("#home")}
          onLogout={handleLogout}
          onUpdateUser={handleUpdateUser}
        />
      ) : (
        <>
          <HomePage onLoginClick={showAuth} />
          <FeedPage currentUser={currentUser} onRequireAuth={showAuth} />
        </>
      )}
    </Layout>
  );
}

export default App;
