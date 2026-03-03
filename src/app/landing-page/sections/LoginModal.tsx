import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  X,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { type AuthUser } from "@/lib/utils/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useLoginForm } from "../hooks/useLoginForm";
import { useSignUpForm } from "../hooks/useSignUpForm";
import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";

export type { AuthUser };

const EASE = [0.16, 1, 0.3, 1] as const;

type ModalView = "login" | "signup" | "forgot";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}

/* ─────────────────────── Shared sub-components ─────────────────────── */

/**
 * What: Password visibility toggle button for Input trailingAction.
 * Why: Reused across login, signup, and any password field in the modal.
 */
function PasswordToggle({
  visible,
  onToggle,
}: {
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="shrink-0 text-neutral-500 transition-colors hover:text-neutral-300"
      aria-label={visible ? "Hide password" : "Show password"}
    >
      {visible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
    </button>
  );
}

/* ─────────────────────── View components ─────────────────────── */

/**
 * What: Sign-in form with email + password.
 * Why: Primary authentication entry point.
 */
function LoginView({
  onSwitch,
  onClose,
  onLoginSuccess,
}: {
  onSwitch: (v: ModalView) => void;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isSubmitting,
    showPassword,
    setShowPassword,
    handleSubmit,
    clearError,
  } = useLoginForm(onLoginSuccess, onClose);

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          Sign in to your Alder<span className="align-super text-[8px]">®</span>{" "}
          account
        </p>
      </div>

      {errors.general && (
        <div className="mb-5 flex items-center gap-2.5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
          <AlertCircle className="size-5 shrink-0 text-red-400" />
          <p className="text-sm text-red-400">{errors.general}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className="space-y-5"
      >
        {/* What: Email + password fields wired to the login form hook.
            Why: When the user clicks “Sign In”, `handleSubmit` runs validation,
                 and any messages are surfaced via `errors.email` / `errors.password`
                 which the shared Input component renders under each field.
            What for: Ensures a click on the submit button always triggers validation
                      and shows inline messages without relying on native browser UI. */}
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError("email");
            clearError("general");
          }}
          placeholder="you@example.com"
          autoComplete="off"
          icon={<Mail className="size-5" />}
          isInvalid={!!errors.email}
          hint={errors.email}
        />
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearError("password");
            clearError("general");
          }}
          placeholder="••••••••"
          autoComplete="off"
          icon={<Lock className="size-5" />}
          isInvalid={!!errors.password}
          hint={errors.password}
          trailingAction={
            <PasswordToggle
              visible={showPassword}
              onToggle={() => setShowPassword((p) => !p)}
            />
          }
        />

        <div className="flex justify-end">
          <Button
            type="button"
            variant="link-gray"
            size="sm"
            onClick={() => onSwitch("forgot")}
            className="text-xs text-neutral-400 hover:text-white hover:bg-transparent"
          >
            Forgot password?
          </Button>
        </div>

        <Button
          type="submit"
          variant="primary-dark"
          size="xl"
          isLoading={isSubmitting}
          showTextWhileLoading
          className="mt-2 w-full font-semibold"
        >
          {isSubmitting ? "Signing in…" : "Sign In"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-500">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => onSwitch("signup")}
          className="cursor-pointer font-medium text-white transition-colors hover:text-neutral-300"
        >
          Create Account
        </button>
      </p>
    </>
  );
}

/**
 * What: Registration form with full name, email, password, and confirm password.
 * Why: Allows new users to create an account from the modal without a page redirect.
 */
function SignUpView({
  onSwitch,
  onClose,
  onLoginSuccess,
}: {
  onSwitch: (v: ModalView) => void;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}) {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    isSubmitting,
    showPassword,
    setShowPassword,
    showConfirm,
    setShowConfirm,
    handleSubmit,
    clearError,
  } = useSignUpForm(onLoginSuccess, onClose);

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Create Account
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          Join Alder<span className="align-super text-[8px]">®</span> today
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className="space-y-5"
      >
        <Input
          theme="dark"
          label="Full Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            clearError("name");
          }}
          placeholder="John Doe"
          autoComplete="off"
          icon={<User className="size-5" />}
          isInvalid={!!errors.name}
          hint={errors.name}
        />
        <Input
          theme="dark"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError("email");
          }}
          placeholder="you@example.com"
          autoComplete="off"
          icon={<Mail className="size-5" />}
          isInvalid={!!errors.email}
          hint={errors.email}
        />
        <Input
          theme="dark"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearError("password");
          }}
          placeholder="Min. 6 characters"
          autoComplete="off"
          icon={<Lock className="size-5" />}
          isInvalid={!!errors.password}
          hint={errors.password}
          trailingAction={
            <PasswordToggle
              visible={showPassword}
              onToggle={() => setShowPassword((p) => !p)}
            />
          }
        />
        <Input
          theme="dark"
          label="Confirm Password"
          type={showConfirm ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            clearError("confirmPassword");
          }}
          placeholder="Re-enter password"
          autoComplete="off"
          icon={<Lock className="size-5" />}
          isInvalid={!!errors.confirmPassword}
          hint={errors.confirmPassword}
          trailingAction={
            <PasswordToggle
              visible={showConfirm}
              onToggle={() => setShowConfirm((p) => !p)}
            />
          }
        />

        <Button
          type="submit"
          variant="primary-dark"
          size="xl"
          isLoading={isSubmitting}
          showTextWhileLoading
          className="mt-2 w-full font-semibold"
        >
          {isSubmitting ? "Creating account…" : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-500">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => onSwitch("login")}
          className="cursor-pointer font-medium text-white transition-colors hover:text-neutral-300"
        >
          Sign In
        </button>
      </p>
    </>
  );
}

/**
 * What: Forgot-password form that accepts an email and shows a success state.
 * Why: Lets users request a password reset without leaving the modal.
 */
function ForgotPasswordView({
  onSwitch,
}: {
  onSwitch: (v: ModalView) => void;
}) {
  const { email, setEmail, error, setError, isSubmitting, sent, handleSubmit } =
    useForgotPasswordForm();

  if (sent) {
    return (
      <div className="flex flex-col items-center py-4 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle className="size-7 text-emerald-400" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-white">
          Check Your Email
        </h2>
        <p className="mt-2 max-w-xs text-sm text-neutral-400">
          We&apos;ve sent a password reset link to{" "}
          <span className="font-medium text-white">{email}</span>. Please check
          your inbox.
        </p>
        <button
          type="button"
          onClick={() => onSwitch("login")}
          className="cursor-pointer mt-8 text-sm font-medium text-white transition-colors hover:text-neutral-300"
        >
          &larr; Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Forgot Password
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className="space-y-5"
      >
        <Input
          theme="dark"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(undefined);
          }}
          placeholder="you@example.com"
          autoComplete="off"
          icon={<Mail className="size-5" />}
          isInvalid={!!error}
          hint={error}
        />

        <Button
          type="submit"
          variant="primary-dark"
          size="xl"
          isLoading={isSubmitting}
          showTextWhileLoading
          className="mt-2 w-full font-semibold"
        >
          {isSubmitting ? "Sending…" : "Send Reset Link"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-500">
        Remember your password?{" "}
        <button
          type="button"
          onClick={() => onSwitch("login")}
          className="cursor-pointer font-medium text-white transition-colors hover:text-neutral-300"
        >
          Sign In
        </button>
      </p>
    </>
  );
}

/* ─────────────────────── Main modal wrapper ─────────────────────── */

/**
 * What: A dark-themed overlay modal with three swappable form views.
 * Why: Keeps all auth flows in a single modal so users never leave the page.
 * What for: Navbar Login button opens this; internal links switch views.
 */
export default function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: LoginModalProps) {
  const [view, setView] = useState<ModalView>("login");

  const handleClose = useCallback(() => {
    setView("login");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, handleClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-60 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={
              view === "login"
                ? "Login"
                : view === "signup"
                  ? "Create Account"
                  : "Forgot Password"
            }
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative z-10 w-full max-w-md rounded-2xl border border-neutral-800 bg-[#111111] p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={handleClose}
              className="cursor-pointer absolute right-4 top-4 rounded-lg p-1 text-neutral-500 transition-colors hover:text-white"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                {view === "login" && (
                  <LoginView
                    onSwitch={setView}
                    onClose={handleClose}
                    onLoginSuccess={onLoginSuccess}
                  />
                )}
                {view === "signup" && (
                  <SignUpView
                    onSwitch={setView}
                    onClose={handleClose}
                    onLoginSuccess={onLoginSuccess}
                  />
                )}
                {view === "forgot" && <ForgotPasswordView onSwitch={setView} />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
