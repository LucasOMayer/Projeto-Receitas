import { useState } from "react";
import "./App.css";
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
    setCurrentUser(user);
    showSection("#home");
  }

  return (
    <Layout
      onHomeClick={() => showSection("#home")}
      onRecipesClick={() => showSection("#receitas")}
      onLoginClick={showAuth}
    >
      {view === "home" ? (
        <>
          <HomePage onLoginClick={showAuth} />
          <FeedPage currentUser={currentUser} onRequireAuth={showAuth} />
        </>
      ) : (
        <AuthPage
          onBackHome={() => showSection("#home")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </Layout>
  );
}

export default App;
