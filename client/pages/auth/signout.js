import { useEffect } from "react";
import Router from "next/router";

const Signout = () => {
  useEffect(() => {
    Router.push("/");
  }, []);

  return <div>Signing you out...</div>;
};

export default Signout;
