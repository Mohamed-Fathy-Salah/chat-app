import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1>{JSON.stringify(user)}</h1>
    </div>
  );
};

export default LandingPage;
