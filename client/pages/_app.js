import "bootstrap/dist/css/bootstrap.css";
import Header from "../components/header";
import { AuthProvider } from "../context/AuthContext";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <AuthProvider>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </AuthProvider>
  );
};

export default AppComponent;
