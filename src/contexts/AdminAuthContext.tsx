import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface AdminAuth {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuth | null>(null);

const ADMIN_EMAIL = "admin@novaimobiliaria.com.br";
const ADMIN_PASSWORD = "nova2024";
const SESSION_KEY = "admin_session";
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return false;
    try {
      const { expiresAt } = JSON.parse(session);
      return Date.now() < expiresAt;
    } catch {
      return false;
    }
  });

  const refreshSession = useCallback(() => {
    if (!isAuthenticated) return;
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return;
    try {
      const parsed = JSON.parse(session);
      if (Date.now() >= parsed.expiresAt) {
        setIsAuthenticated(false);
        localStorage.removeItem(SESSION_KEY);
      }
    } catch {
      setIsAuthenticated(false);
      localStorage.removeItem(SESSION_KEY);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const interval = setInterval(refreshSession, 60_000);
    return () => clearInterval(interval);
  }, [refreshSession]);

  const login = (email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ expiresAt: Date.now() + SESSION_DURATION }));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
