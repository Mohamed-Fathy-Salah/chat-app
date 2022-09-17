import "bootstrap/dist/css/bootstrap.css";
import Header from "../components/header";
import { AuthProvider } from "../context/AuthContext";

const AppComponent = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Header />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
};

export default AppComponent;
