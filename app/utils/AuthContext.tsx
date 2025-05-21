"use client";
import axios from "axios";
import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";

const APP_URL =
  process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_APP_LIVE_URL;
const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if a token exists in localStorage to determine logged-in state
    const token = localStorage.getItem("token");

    setIsLoggedIn(!!token); // Set `isLoggedIn` to true if a token exists
  }, []);

  const login = (token: any) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");
    const params = new URLSearchParams(userData || "");
    const email = params.get("email");
    const query = `mutation Logout($logout: logoutInput) {
                    logout(user: $logout) {
                      email
                      first_name
                      last_name
                    }
                  }`;
    let data = JSON.stringify({
      query,
      variables: { logout: { email } },
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: APP_URL,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: await data,
    };

    await axios
      .request(config)
      .then(async (response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setIsLoggedIn(false);
        return await response;
      })
      .catch((error) => {
        console.log(error);
        throw new Error("Logout failed");
      });
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
