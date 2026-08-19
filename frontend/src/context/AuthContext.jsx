import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")) || null; }
    catch { return null; }
  });
  const [loading, setLoading] = useState(Boolean(token));

  const saveSession = (newToken, newUser) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    saveSession(res.data.token, res.data.user);
    return res.data;
  };

  const register = async (payload) => {
    const res = await API.post("/auth/register", payload);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    let active = true;
    if (!token) { setLoading(false); return; }
    API.get("/auth/me")
      .then((res) => {
        if (active) {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
      })
      .catch(() => { if (active) logout(); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [token]);

  return (
    <AuthContext.Provider value={{
      token, user, loading,
      isAuthenticated: Boolean(token),
      login, register, logout,
      refreshUser: async () => {
        const res = await API.get("/auth/me");
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        return res.data.user;
      }
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
