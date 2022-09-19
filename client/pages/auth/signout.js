import { useEffect } from "react";
import Router from "next/router";
import axios from "axios";
const Signout = () => {
  useEffect(() => {
    try {
      axios.post(
        "http://localhost:3001/api/auth/signout",
        {},
        { withCredentials: true }
      );
      Router.push("/");
    } catch (e) {
      console.error("---", e);
    }
  }, []);

  return <div>Signing you out...</div>;
};

export default Signout;
