import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthContext = createContext();
const BASE = "http://localhost:3001/api/auth";

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const register = async (user) => {
    try {
      await axios.post(BASE + "/signup", user);
      setError(null);
      router.push("/");
    } catch (err) {
      setError( {err.response.data.errors.map((err) => ( {err.message}))});
    }
  };

  const login = async (user) => {
    try {
      await axios.post(BASE + "/signin", user);
      setError(null);
      router.push("/");
    } catch (err) {
      setError( {err.response.data.errors.map((err) => ( {err.message}))});
    }
  };

  const logout = async () => {
    await axios.post(BASE + "/signout");
    setUser(null);
    router.push("/");
  };

  const checkUserLoggedIn = async () => {
    try {
      const { data } = await axios.get(BASE + "/currentuser");
      if (data) {
        setUser(data.currentuser);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, error, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
