import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import client from "../api/build-client";
import Header from "../components/header";
import Chat from "./chat/index";
import { openDB } from "idb";

const LandingPage = () => {
  const [user, setUser] = useState();
  const [db, setDB] = useState();

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

  useEffect(() => {
    const createDB = async () => {
      try {
        const newDB = await openDB(user.id, 1, {
          upgrade(x) {
            x.createObjectStore("u");
            x.createObjectStore("g");
          },
        });
        setDB(newDB);
      } catch (e) {
        console.error("---", e);
      }
    };

    createDB();
  }, [user]);

  return (
    <div>
      <Header currentUser={user} />
      <div className="container">
        {user ? (
          <Chat currentUser={user} db={db} />
        ) : (
          <h1> sign in/up first</h1>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
