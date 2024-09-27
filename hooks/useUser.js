import React, { useState, useEffect, useContext, createContext } from "react";
import { getToken, setCookie, deleteCookie } from "@/services/cookies";
import api, { useAxiosInterceptors } from "@/services/api";
import { mutateOrders } from "../utils";

const authContext = createContext();

const useUserAuth = () => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleUser = (user, token) => {
    if (user) {
      setUser(user);
      setLoading(false);
      api.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      setUser(false);
      setLoading(false);
    }
    mutateOrders();
  };

  const userHandler = async (token, resetForm) => {
    setCookie(token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    const { data: userInfo } = await api.get("/session.json");
    localStorage.setItem("user-data", JSON.stringify(userInfo));
    handleUser(userInfo, token);
    resetForm();
  };

  const login = async (userData, resetForm) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const { data } = await api.post("/login.json", userData);
      const token = data.token;
      await userHandler(token, resetForm);
      return true;
    } catch (error) {
      console.log("error form login_______", error);
      const response = error;
      if (response) {
        setErrorMessage(response?.data?.message);
      } else {
        setErrorMessage("A network error occured");
      }
      handleUser(false);
      return false;
    }
  };

  const logout = () => {
    deleteCookie();
    localStorage.removeItem("user-data");
    handleUser(false);
  };

  const createAccount = (userData) => {
    setLoading(true);
    try {
      const { data } = api.post("/register.json", userData);
    } catch (error) {}
  };

  useEffect(() => {
    useAxiosInterceptors();

    const token = getToken();

    token
      ? handleUser(
          JSON.parse(localStorage.getItem("user-data") || false),
          token
        )
      : logout();
  }, []);

  return {
    user,
    loading,
    login,
    createAccount,
    errorMessage,
    setErrorMessage,
    logout,
    userHandler,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useUserAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useUser = () => {
  return useContext(authContext);
};
