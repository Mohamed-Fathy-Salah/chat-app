import "bootstrap/dist/css/bootstrap.css";
import Header from "../components/header";
import { useEffect, useState } from "react";
import axios from "axios";

const AppComponent = ({ Component, pageProps }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser();
  }, [user]);

  const getCurrentUser = () => {
    try {
      const { data } = axios.get("http://localhost:3001/api/auth/currentUser", {
        withCredentials: true,
      });
        console.log("=========", data)
      setUser(data);
    } catch (e) {
      setUser(null);
    }
  };

  return (
    <>
      <Header currentUser={user} />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default AppComponent;
