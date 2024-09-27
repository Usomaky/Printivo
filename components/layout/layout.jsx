import React, { useEffect } from "react";
import Footer from "./footer";
import Nav from "../nav/nav";
import Head from "./head";
import { useUser } from "@/hooks/useUser";
import api from "@/services/api";
import { getToken } from "@/services/cookies";
import jwtDecode from "jwt-decode";

const Layout = ({ children, customHead }) => {
  const { user, logout } = useUser();
  const token = getToken();

  useEffect(() => {
    if (!user) {
      let visitorID = localStorage.getItem("visitor_id");
      if (!visitorID) {
        api.get("/session.json").then((res) => {
          localStorage.setItem("visitor_id", res.data.visitor_id);
        });
      }
    }

    if (token) {
      if (jwtDecode(token).exp < Date.now() / 1000) {
        logout();
      }
    }
  }, []);

  return (
    <>
      {!customHead && <Head />}
      <Nav />
      <div id="page">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
