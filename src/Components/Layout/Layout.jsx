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
}) {
  return (
    <div className="app">
      <Header
        onHomeClick={onHomeClick}
        onRecipesClick={onRecipesClick}
        onLoginClick={onLoginClick}
        onAccountClick={onAccountClick}
        onLogout={onLogout}
        currentUser={currentUser}
      />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
