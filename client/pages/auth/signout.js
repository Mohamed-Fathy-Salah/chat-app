import { useEffect } from "react";
import Router from "next/router";
import axios from "axios";

const Signout = () => {

  useEffect(() => {
    //doRequest();
      const logout = async () => {
          await axios.post(
              "http://localhost:3001/api/auth/signout",
              {},
              { withCredentials: true }
          );
      }
      logout();
      Router.push("/");
  }, []);

  return <div>Signing you out...</div>;
};

export default Signout;
