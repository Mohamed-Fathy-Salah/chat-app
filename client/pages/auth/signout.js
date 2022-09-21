import { useEffect } from "react";
import { useRouter } from "next/router";
import client from "../../api/build-client";

const Signout = () => {
  const router = useRouter();
  useEffect(() => {
    try {
      client().post("/auth/signout");
      router.push("/");
    } catch (e) {
      console.error("---", e);
    }
  }, []);

  return <div>Signing you out...</div>;
};

export default Signout;
