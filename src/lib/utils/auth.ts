/**
 * What: Authentication utilities for session management.
 * Why: Provides centralized auth state handling using localStorage.
 * What for: Used by landing page components for login/signup flows
 *           and by the main app to determine authenticated state.
 */

export interface AuthUser {
  name: string;
  email: string;
}

export interface StoredUser extends AuthUser {
  password: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SESSION_KEY = "auth_session";
const USERS_KEY = "registered_users";

/**
 * What: Retrieves the current authenticated user from session storage.
 * Why: Allows components to check if a user is logged in.
 */
export function getSessionUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

/**
 * What: Sets or clears the authenticated user session.
 * Why: Called after successful login or on logout.
 */
export function setSessionUser(user: AuthUser | null): void {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

/**
 * What: Retrieves all registered users from localStorage.
 * Why: Used for login validation and duplicate email checks.
 */
export function getRegisteredUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
}

/**
 * What: Saves a new user to the registered users list.
 * Why: Called during signup to persist the new account.
 */
export function registerUser(user: StoredUser): void {
  if (typeof window === "undefined") return;
  const users = getRegisteredUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/**
 * What: Finds a user by email in the registered users list.
 * Why: Used for login validation and duplicate email checks.
 */
export function findUserByEmail(email: string): StoredUser | undefined {
  const users = getRegisteredUsers();
  return users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
}

/**
 * What: Checks if a user is currently authenticated.
 * Why: Convenience function for conditional rendering.
 */
export function isAuthenticated(): boolean {
  return getSessionUser() !== null;
}

/**
 * What: Logs out the current user by clearing the session.
 * Why: Provides a simple logout function.
 */
export function logout(): void {
  setSessionUser(null);
}
