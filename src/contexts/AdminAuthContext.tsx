import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

const ADMIN_EMAIL = "novaimobiliariavgs@gmail.com";
const ADMIN_PASSWORD = "Nova@2026";
const STORAGE_KEY = "nova_admin_session";
const INACTIVITY_TIMEOUT = 8 * 60 * 60 * 1000; // 8 hours

interface AdminUser {
  email: string;
}

interface AdminAuth {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuth | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const lastActivityRef = useRef(Date.now());

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { email: string };
        if (parsed?.email === ADMIN_EMAIL) {
          setUser({ email: parsed.email });
        }
      }
    } catch {
      // ignore
    }
    setIsLoading(false);
  }, []);

  // Track user activity
  const resetActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  useEffect(() => {
    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetActivity));
    return () => events.forEach((e) => window.removeEventListener(e, resetActivity));
  }, [resetActivity]);

  // Check inactivity
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      if (Date.now() - lastActivityRef.current > INACTIVITY_TIMEOUT) {
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
      }
    }, 60_000);
    return () => clearInterval(interval);
  }, [user]);

  const login = async (email: string, password: string) => {
    const normalized = email.trim().toLowerCase();
    if (normalized === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
      const session = { email: ADMIN_EMAIL };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      setUser(session);
      resetActivity();
      return {};
    }
    return { error: "E-mail ou senha incorretos." };
  };

  const logout = async () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated: !!user, isLoading, user, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
