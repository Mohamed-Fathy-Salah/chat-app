import "bootstrap/dist/css/bootstrap.css";
import Header from "../components/header";
import axios from "axios";
import { useState } from "react";

const AppComponent = ({ Component, pageProps }) => {
  const [user, setUser] = useState(null);

  axios
    .get("http://localhost:3001/api/auth/currentuser", {
      withCredentials: true,
    })
    .then((res) => {
      setUser(
        res.data.currentUser ? JSON.stringify(res.data.currentUser) : null
      );
    });

  return (
    <div>
      <Header currentUser={user} />
      <div className="container">
        <Component currentUser={user} {...pageProps} />
      </div>
    </div>
  );
};

export default AppComponent;
