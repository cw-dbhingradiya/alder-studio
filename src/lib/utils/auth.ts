/**
 * What: Authentication utilities for session management.
 * Why: Provides centralized auth state handling using localStorage.
 * What for: Used by landing page components for login/signup flows
 *           and by the main app to determine authenticated state.
 */

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  timezone?: string;
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
 * What: Generates a unique id for new users.
 * Why: Each user needs a stable id for session and references.
 */
function generateUserId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * What: Retrieves the current authenticated user from session storage.
 * Why: Allows components to check if a user is logged in.
 */
export function getSessionUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthUser & { id?: string };
    if (!parsed.id) {
      const migrated: AuthUser = { ...parsed, id: generateUserId() };
      setSessionUser(migrated);
      return migrated;
    }
    return parsed as AuthUser;
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
 * What: Retrieves all registered users from localStorage; migrates legacy users without id.
 * Why: Used for login validation and duplicate email checks; ensures every user has an id.
 */
export function getRegisteredUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as (StoredUser & { id?: string })[];
    let needsSave = false;
    const users: StoredUser[] = parsed.map((u) => {
      if (!u.id) {
        needsSave = true;
        return { ...u, id: generateUserId() } as StoredUser;
      }
      return u as StoredUser;
    });
    if (needsSave) localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return users;
  } catch {
    return [];
  }
}

/**
 * What: Saves a new user to the registered users list with a unique id.
 * Why: Called during signup to persist the new account; id is used after login.
 */
export function registerUser(data: Omit<StoredUser, "id">): StoredUser {
  if (typeof window === "undefined")
    return { id: "", ...data } as StoredUser;
  const id = generateUserId();
  const user: StoredUser = { id, name: data.name, email: data.email, password: data.password };
  const users = getRegisteredUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return user;
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

/**
 * What: Updates the current session user with partial fields and persists to localStorage.
 * Why: Allows profile/account page to change name, email, phone, timezone and keep session in sync.
 */
export function updateSessionUser(updates: Partial<Pick<AuthUser, "name" | "email" | "phone" | "timezone">>): AuthUser | null {
  if (typeof window === "undefined") return null;
  const current = getSessionUser();
  if (!current) return null;
  const updated: AuthUser = { ...current, ...updates };
  setSessionUser(updated);
  return updated;
}

/**
 * What: Updates the matching registered user's name and email in localStorage.
 * Why: When user changes name/email in account, registered users list stays in sync for future logins.
 */
export function updateRegisteredUserById(
  userId: string,
  updates: Partial<Pick<AuthUser, "name" | "email">>
): void {
  if (typeof window === "undefined") return;
  const users = getRegisteredUsers();
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) return;
  users[index] = { ...users[index], ...updates };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
