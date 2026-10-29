"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** Akun dummy untuk simulasi login (tidak ada backend). */
export const DEMO_ACCOUNT = { email: "imam@gmail.com", password: "imam123" };
const STORAGE_KEY = "fe-test:session";

interface AuthContextValue {
  email: string | null;
  /** false selama sesi belum dibaca dari localStorage (menghindari hydration mismatch). */
  ready: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setEmail(localStorage.getItem(STORAGE_KEY));
    } catch {
      /* abaikan */
    }
    setReady(true);
  }, []);

  const login = useCallback((inputEmail: string, password: string) => {
    const ok =
      inputEmail.trim().toLowerCase() === DEMO_ACCOUNT.email &&
      password === DEMO_ACCOUNT.password;
    if (ok) {
      setEmail(DEMO_ACCOUNT.email);
      try {
        localStorage.setItem(STORAGE_KEY, DEMO_ACCOUNT.email);
      } catch {
        /* abaikan */
      }
    }
    return ok;
  }, []);

  const logout = useCallback(() => {
    setEmail(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* abaikan */
    }
  }, []);

  const value = useMemo(
    () => ({ email, ready, login, logout }),
    [email, ready, login, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam AuthProvider");
  return ctx;
}
