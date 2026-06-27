import Footer from "./Footer";
import Header from "./Header";

function Layout({ children, onHomeClick, onRecipesClick, onLoginClick }) {
  return (
    <div className="app">
      <Header
        onHomeClick={onHomeClick}
        onRecipesClick={onRecipesClick}
        onLoginClick={onLoginClick}
      />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
