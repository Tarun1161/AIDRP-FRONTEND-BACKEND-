import { createContext, useContext, useState } from "react";
import { api, setAuth, clearAuth } from "./api";

const AuthCtx = createContext();
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    username: localStorage.getItem("aidrp_user"),
    role: localStorage.getItem("aidrp_role")
  });

  const login = async (u, p) => {
    const r = await api.login(u, p);
    setAuth(r.access_token, r.role, r.username);
    setUser({ username: r.username, role: r.role });
  };

  const logout = () => {
    clearAuth();
    setUser({});
  };

  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
