import { useState, useCallback, type FormEvent } from "react";
import { EMAIL_REGEX } from "@/lib/utils/auth";

/**
 * What: Encapsulates forgot-password form state and submission.
 * Why: Keeps the ForgotPasswordView component free of business logic.
 * What for: Used by ForgotPasswordView inside LoginModal.
 */
export function useForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = useCallback(
    async (ev: FormEvent) => {
      ev.preventDefault();
      if (!email.trim()) {
        setError("Email is required");
        return;
      }
      if (!EMAIL_REGEX.test(email.trim())) {
        setError("Please enter a valid email address");
        return;
      }
      setError(undefined);
      setIsSubmitting(true);
      try {
        await new Promise((r) => setTimeout(r, 1500));
        setSent(true);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [email],
  );

  return {
    email,
    setEmail,
    error,
    setError,
    isSubmitting,
    sent,
    handleSubmit,
  };
}
