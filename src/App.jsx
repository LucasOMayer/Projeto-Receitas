import { useState } from "react";
import "./App.css";
import AuthPage from "./Components/Auth/AuthPage";
import Layout from "./Components/Layout/Layout";
import FeedPage from "./Components/Pages/FeedPage";
import HomePage from "./Components/Pages/HomePage";

function App() {
  const [view, setView] = useState("home");

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

  return (
    <Layout
      onHomeClick={() => showSection("#home")}
      onRecipesClick={() => showSection("#receitas")}
      onLoginClick={showAuth}
    >
      {view === "home" ? (
        <>
          <HomePage onLoginClick={showAuth} />
          <FeedPage />
        </>
      ) : (
        <AuthPage onBackHome={() => showSection("#home")} />
      )}
    </Layout>
  );
}

export default App;
