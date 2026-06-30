import Footer from "./Footer";
import Header from "./Header";

function Layout({
  children,
  currentUser,
  onHomeClick,
  onRecipesClick,
  onLoginClick,
  onAccountClick,
  onLogout,
  onCreateRecipe,
}) {
  return (
    <div className="app">
      <Header
        onHomeClick={onHomeClick}
        onRecipesClick={onRecipesClick}
        onLoginClick={onLoginClick}
        onAccountClick={onAccountClick}
        onLogout={onLogout}
        onCreateRecipe={onCreateRecipe}
        currentUser={currentUser}
      />
      <main>{children}</main>
      <Footer
        currentUser={currentUser}
        onHomeClick={onHomeClick}
        onRecipesClick={onRecipesClick}
        onLoginClick={onLoginClick}
        onAccountClick={onAccountClick}
        onCreateRecipe={onCreateRecipe}
      />
    </div>
  );
}

export default Layout;
