import { useState, useCallback, type FormEvent } from "react";
import {
  type AuthUser,
  type FormErrors,
  EMAIL_REGEX,
  findUserByEmail,
  registerUser,
  setSessionUser,
} from "@/lib/utils/auth";

/**
 * What: Encapsulates sign-up form state, validation, and submission.
 * Why: Keeps the SignUpView component free of business logic so the
 *      UI layer only handles rendering and event wiring.
 * What for: Used by SignUpView inside LoginModal.
 */
export function useSignUpForm(
  onLoginSuccess: (user: AuthUser) => void,
  onClose: () => void,
) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = useCallback((): FormErrors => {
    const e: FormErrors = {};
    if (!name.trim()) e.name = "Full name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!EMAIL_REGEX.test(email.trim()))
      e.email = "Please enter a valid email address";
    if (!password) e.password = "Password is required";
    else if (password.length < 6)
      e.password = "Password must be at least 6 characters";
    if (!confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword)
      e.confirmPassword = "Passwords do not match";
    return e;
  }, [name, email, password, confirmPassword]);

  const clearError = useCallback(
    (field: keyof FormErrors) =>
      setErrors((prev) => ({ ...prev, [field]: undefined })),
    [],
  );

  const handleSubmit = useCallback(
    async (ev: FormEvent) => {
      ev.preventDefault();
      const v = validate();
      if (Object.keys(v).length > 0) {
        setErrors(v);
        return;
      }
      setErrors({});
      setIsSubmitting(true);
      try {
        await new Promise((r) => setTimeout(r, 1500));

        if (findUserByEmail(email.trim())) {
          setErrors({ email: "An account with this email already exists." });
          return;
        }

        const newUser = registerUser({
          name: name.trim(),
          email: email.trim(),
          password,
        });

        const authUser: AuthUser = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        };
        setSessionUser(authUser);
        onLoginSuccess(authUser);
        onClose();
      } catch {
        setErrors({ email: "Registration failed. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    },
    [validate, name, email, password, onLoginSuccess, onClose],
  );

  return {
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
  };
}
