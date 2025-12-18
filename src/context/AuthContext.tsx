"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AuthState = {
  userId: string;
  loggedIn: boolean;
  loading: boolean;
  login: (userId: string) => void;
  logout: () => void;
};
const AuthContext = createContext<AuthState>({
  userId: "",
  loggedIn: false,
  loading: true,
  login: () => {
    throw new Error("login() called outside AuthProvider");
  },
  logout: () => {
    throw new Error("logout() called outside AuthProvider");
  },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUserId(data.userId);
          setLoggedIn(true);
        } else {
          setUserId("");
          setLoggedIn(false);
        }
      } catch {
        setUserId("");
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }

    loadAuth();
  }, []);

  const login = (uid: string) => {
    setUserId(uid);
    setLoggedIn(true);
  };

  const logout = () => {
    setUserId("");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ userId, loggedIn, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
