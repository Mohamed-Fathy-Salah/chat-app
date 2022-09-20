import "bootstrap/dist/css/bootstrap.css";
import Header from "../components/header";
import { useState } from "react";
import client from "../api/build-client";

const AppComponent = ({ Component, pageProps }) => {
  const [user, setUser] = useState(null);

  client()
    .get("/auth/currentuser")
    .then(({ data }) => {
      setUser(data.currentUser ? JSON.stringify(data.currentUser) : null);
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
