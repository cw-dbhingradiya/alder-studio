"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  type AuthUser,
  getSessionUser,
  setSessionUser,
  logout as authLogout,
} from "./auth";

/**
 * What: Context value type for authentication state.
 * Why: Provides typed access to auth state and actions throughout the app.
 */
interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * What: Provider component that wraps the app with auth state.
 * Why: Allows any component to access and modify auth state.
 * What for: Used in layout.tsx to provide auth context to all pages.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getSessionUser();
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  const login = useCallback((loggedInUser: AuthUser) => {
    setSessionUser(loggedInUser);
    setUser(loggedInUser);
  }, []);

  const logout = useCallback(() => {
    authLogout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * What: Hook to access auth context from any component.
 * Why: Provides a convenient way to use auth state and actions.
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
