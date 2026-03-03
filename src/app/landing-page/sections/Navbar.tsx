import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { LogOut, LayoutDashboard, X } from "lucide-react";
import LoginModal from "./LoginModal";
import { type AuthUser } from "@/lib/utils/auth";
import { useAuth } from "@/lib/utils/AuthContext";

const NAV_LINKS = ["Home", "Collection", "About", "Contact"];
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * What: Extracts up to two initials from a full name / email prefix.
 * Why: Used for the profile avatar when no image is available.
 */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

/**
 * What: Profile avatar button with an animated dropdown containing user info and logout.
 * Why: Replaces the Login button once the user is authenticated.
 */
function ProfileDropdown({
  user,
  onLogout,
  onDashboard,
}: {
  user: AuthUser;
  onLogout: () => void;
  onDashboard: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <motion.button
        type="button"
        onClick={() => setOpen((p) => !p)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="flex size-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-neutral-200"
        aria-label="Profile menu"
      >
        {getInitials(user.name)}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-neutral-800 bg-[#111111] shadow-2xl"
          >
            {/* User info: name, email, id available after login */}
            <div className="border-b border-neutral-800 px-4 py-3">
              <p className="truncate text-sm font-medium text-white">
                {user.name}
              </p>
              <p className="truncate text-xs text-neutral-400">{user.email}</p>
              <p className="mt-1 truncate text-xs text-neutral-500">
                ID: {user.id}
              </p>
            </div>

            {/* Dashboard */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onDashboard();
              }}
              className="cursor-pointer flex w-full items-center gap-2.5 px-4 py-3 text-sm text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
            >
              <LayoutDashboard className="size-4" />
              Dashboard
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              className="cursor-pointer flex w-full items-center gap-2.5 border-t border-neutral-800 px-4 py-3 text-sm text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { user, login, logout } = useAuth();

  const openLogin = useCallback(() => {
    setLoginOpen(true);
    setMobileOpen(false);
  }, []);

  const handleLoginSuccess = useCallback(
    (loggedInUser: AuthUser) => {
      login(loggedInUser);
      setLoginOpen(false);
    },
    [login]
  );

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleDashboard = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-800/50 bg-[#0A0A0A]/80 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <motion.a
            href="#"
            className="text-xl font-bold tracking-tight text-white"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            Alder<span className="align-super text-[10px]">®</span>
          </motion.a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.4 + i * 0.1 }}
                className="text-sm text-neutral-400 transition-colors duration-300 hover:text-white"
              >
                {link}
              </motion.a>
            ))}

            {/* Desktop: Login button or profile avatar */}
            {user ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.8 }}
              >
                <ProfileDropdown
                  user={user}
                  onLogout={handleLogout}
                  onDashboard={handleDashboard}
                />
              </motion.div>
            ) : (
              <motion.button
                type="button"
                onClick={openLogin}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer rounded-lg border border-neutral-700 bg-white px-5 py-1.5 text-sm font-medium text-[#0A0A0A] transition-colors duration-300 hover:bg-neutral-200"
              >
                Login
              </motion.button>
            )}
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            {/* Mobile: Login button or profile avatar */}
            {user ? (
              <ProfileDropdown
                user={user}
                onLogout={handleLogout}
                onDashboard={handleDashboard}
              />
            ) : (
              <button
                type="button"
                onClick={openLogin}
                className="rounded-lg border border-neutral-700 bg-white px-4 py-1.5 text-sm font-medium text-[#0A0A0A] transition-colors duration-300 hover:bg-neutral-200"
              >
                Login
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex flex-col gap-1.5"
              aria-label="Open menu"
            >
              <span className="block h-0.5 w-6 bg-white" />
              <span className="block h-0.5 w-6 bg-white" />
              <span className="block h-0.5 w-6 bg-white" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile sidebar overlay — slides down from top */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Sidebar panel */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="fixed inset-x-0 top-0 z-70 flex flex-col rounded-b-2xl border-b border-neutral-800 bg-[#0A0A0A] px-6 pb-8 pt-6 shadow-2xl md:hidden"
            >
              {/* Header row with logo and close button */}
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-xl font-bold tracking-tight text-white"
                >
                  Alder<span className="align-super text-[10px]">®</span>
                </a>
                <motion.button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex size-9 items-center justify-center rounded-full bg-neutral-800 text-white transition-colors hover:bg-neutral-700"
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </motion.button>
              </div>

              {/* Navigation links */}
              <nav className="mt-8 flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                    className="rounded-lg px-3 py-3 text-lg font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
                  >
                    {link}
                  </motion.a>
                ))}
              </nav>

              {/* Bottom action — Login or Dashboard/Logout */}
              <div className="mt-6 border-t border-neutral-800 pt-6">
                {user ? (
                  <div className="flex flex-col gap-2">
                    <motion.button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        handleDashboard();
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-3 text-lg font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
                    >
                      <LayoutDashboard className="size-5" />
                      Dashboard
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        handleLogout();
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.46 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-3 text-lg font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
                    >
                      <LogOut className="size-5" />
                      Logout
                    </motion.button>
                  </div>
                ) : (
                  <motion.button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      setLoginOpen(true);
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full rounded-lg bg-white py-3 text-center text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-neutral-200"
                  >
                    Login
                  </motion.button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
