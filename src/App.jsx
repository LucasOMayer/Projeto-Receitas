import { useEffect, useState } from "react";
import "./App.css";
import AccountPage from "./Components/Account/AccountPage";
import AuthPage from "./Components/Auth/AuthPage";
import LoginTransition from "./Components/Auth/LoginTransition";
import Layout from "./Components/Layout/Layout";
import CreateRecipePage from "./Components/Pages/CreateRecipePage";
import FeedPage from "./Components/Pages/FeedPage";
import HomePage from "./Components/Pages/HomePage";
import RecipeDetailsPage from "./Components/Pages/RecipeDetailsPage";

function App() {
  const [view, setView] = useState("home");
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("receitasFoodUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("receitasFoodUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("receitasFoodUser");
    }
  }, [currentUser]);

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
      id: user.id,
      name: user.name || "Usuario Receitas Food",
      username: user.username || "chef_receitas",
      email: user.email,
      bio: user.bio || "Apaixonado por receitas caseiras, sabores simples e novas ideias na cozinha.",
      avatarUrl: user.avatarUrl || "",
    });
    setView("login-transition");
    window.setTimeout(() => {
      showSection("#home");
    }, 1500);
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

  function showCreateRecipe() {
    if (!currentUser) {
      showAuth();
      return;
    }

    setView("create-recipe");
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  }

  function showRecipeDetails(recipe) {
    setSelectedRecipe(recipe);
    setView("recipe-details");
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  }

  return (
    <Layout
      onHomeClick={() => showSection("#home")}
      onRecipesClick={() => showSection("#receitas")}
      onLoginClick={showAuth}
      onAccountClick={showAccount}
      onLogout={handleLogout}
      onCreateRecipe={showCreateRecipe}
      currentUser={currentUser}
    >
      {view === "home" ? (
        <>
          <HomePage onLoginClick={showAuth} />
          <FeedPage
            currentUser={currentUser}
            onRequireAuth={showAuth}
            onCreateRecipe={showCreateRecipe}
            onSelectRecipe={showRecipeDetails}
          />
        </>
      ) : view === "auth" ? (
        <AuthPage
          onBackHome={() => showSection("#home")}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : view === "login-transition" ? (
        <LoginTransition />
      ) : view === "create-recipe" ? (
        <CreateRecipePage
          currentUser={currentUser}
          onBackToFeed={() => showSection("#receitas")}
          onRequireAuth={showAuth}
        />
      ) : view === "recipe-details" ? (
        <RecipeDetailsPage recipe={selectedRecipe} onBackToFeed={() => showSection("#receitas")} />
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
          <FeedPage
            currentUser={currentUser}
            onRequireAuth={showAuth}
            onCreateRecipe={showCreateRecipe}
            onSelectRecipe={showRecipeDetails}
          />
        </>
      )}
    </Layout>
  );
}

export default App;
