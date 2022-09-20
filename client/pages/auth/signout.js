import { useEffect } from "react";
import Router from "next/router";
import client from "../../api/build-client";

const Signout = () => {
  useEffect(() => {
    try {
      client().post("/auth/signout");
      Router.push("/");
    } catch (e) {
      console.error("---", e);
    }
  }, []);

  return <div>Signing you out...</div>;
};

export default Signout;
