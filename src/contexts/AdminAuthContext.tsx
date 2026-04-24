import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

interface FixedUser {
  email: string;
}

interface AdminAuth {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: FixedUser | null;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuth | null>(null);

// Fixed credentials — temporary solution while Supabase Auth is unavailable in production
const FIXED_EMAIL = "novaimobiliariavgs@gmail.com";
const FIXED_PASSWORD = "Nova@2026";
const STORAGE_KEY = "nova_admin_session";
const INACTIVITY_TIMEOUT = 8 * 60 * 60 * 1000; // 8 hours

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FixedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const lastActivityRef = useRef(Date.now());

  const resetActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { email: string; loggedAt: number };
        if (parsed?.email === FIXED_EMAIL) {
          setUser({ email: parsed.email });
        }
      }
    } catch {
      // ignore
    }
    setIsLoading(false);
  }, []);

  // Track user activity for inactivity-based logout
  useEffect(() => {
    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetActivity));
    return () => events.forEach((e) => window.removeEventListener(e, resetActivity));
  }, [resetActivity]);

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
    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail !== FIXED_EMAIL || password !== FIXED_PASSWORD) {
      return { error: "E-mail ou senha incorretos." };
    }
    const session = { email: FIXED_EMAIL, loggedAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setUser({ email: FIXED_EMAIL });
    resetActivity();
    return {};
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
