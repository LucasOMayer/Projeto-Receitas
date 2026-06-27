import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="app">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
