import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthContext = createContext();
const BASE = "http://localhost:3001/api/auth";

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCurrentUser();
  }, [user]);

  const register = async (user) => {
    try {
      setIsLoading(true);
      await axios.post(BASE + "/signup", user, { withCredentials: true });
      setIsLoading(false);
      await getCurrentUser();

      setError(null);
      router.push("/");
    } catch (err) {
      setError(err.response.data.errors.map((err) => err.message));
    }
  };

  const login = async (user) => {
    try {
      setIsLoading(true);
      await axios.post(BASE + "/signin", user, { withCredentials: true });
      setIsLoading(false);
      await getCurrentUser();
      setError(null);
      router.push("/");
    } catch (err) {
      setError(err.response.data.errors.map((err) => err.message));
    }
  };

  const logout = async () => {
    setIsLoading(true);
    await axios.post(BASE + "/signout", {}, { withCredentials: true });
    setIsLoading(false);
    setUser(null);
    router.push("/");
  };

  const getCurrentUser = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(BASE + "/currentuser", {
        withCredentials: true,
      });
      setIsLoading(false);
      if (data) {
        setUser(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, error, register, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
