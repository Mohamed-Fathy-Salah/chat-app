import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import client from "../api/build-client";
import Header from "../components/header";
import Chat from "./chat/index";

const LandingPage = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await client().get("/user?currentUser=1");
        setUser(data);
      } catch (e) {
        console.error("---", e);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <Header currentUser={user} />
      <div className="container">
        {user ? <Chat currentUser={user} /> : <h1> sign in/up first</h1>}
      </div>
    </div>
  );
};

export default LandingPage;
