"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Dropdown } from "@/components/ui/Dropdown";
import { useAuth } from "@/lib/utils/AuthContext";
import { EMAIL_REGEX } from "@/lib/utils/auth";
import { Pencil } from "lucide-react";

/**
 * Common timezone options for the account profile.
 * Why: Gives users a clear list of choices; can be extended later.
 */
const TIMEZONE_OPTIONS = [
  { value: "", label: "Select timezone" },
  { value: "America/New_York", label: "Eastern (ET)" },
  { value: "America/Chicago", label: "Central (CT)" },
  { value: "America/Denver", label: "Mountain (MT)" },
  { value: "America/Los_Angeles", label: "Pacific (PT)" },
  { value: "UTC", label: "UTC" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Europe/Paris", label: "Paris (CET)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Asia/Kolkata", label: "India (IST)" },
  { value: "Australia/Sydney", label: "Sydney (AEST)" },
];

/**
 * What: My Account page — view and edit user profile (name, email, phone, timezone).
 * Why: Central place for users to manage their account; changes update session so header reflects them.
 */
export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [timezone, setTimezone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/");
      return;
    }
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone ?? "");
    setTimezone(user.timezone ?? "");
  }, [user, authLoading, router]);

  const validate = (): boolean => {
    const next: { name?: string; email?: string } = {};
    if (!name.trim()) next.name = "Name is required";
    if (!email.trim()) next.email = "Email is required";
    else if (!EMAIL_REGEX.test(email)) next.email = "Enter a valid email";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = async () => {
    if (!user || !validate()) return;
    setSaving(true);
    try {
      updateUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || undefined,
        timezone: timezone || undefined,
      });
      setIsEditing(false);
      setErrors({});
      toast.success("Account updated");
    } catch (err) {
      console.error("Account update failed", err);
      toast.error("Failed to update account");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone ?? "");
      setTimezone(user.timezone ?? "");
    }
    setErrors({});
    setIsEditing(false);
  };

  if (authLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-spinner border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="p-4 md:p-5">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              My Account
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Manage your profile and contact details.
            </p>
          </div>
          {!isEditing && (
            <Button
              variant="secondary"
              icon={<Pencil className="size-4" />}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </div>

        <div className="rounded-lg border border-border bg-sidebar p-4 md:p-5 space-y-4">
          {isEditing ? (
            <>
              <div className="space-y-2">
                <label
                  htmlFor="account-name"
                  className="block text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <Input
                  id="account-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="account-email"
                  className="block text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <Input
                  id="account-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="account-phone"
                  className="block text-sm font-medium text-foreground"
                >
                  Phone
                </label>
                <Input
                  id="account-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="account-timezone"
                  className="block text-sm font-medium text-foreground"
                >
                  Timezone
                </label>
                <Dropdown
                  options={TIMEZONE_OPTIONS}
                  value={timezone}
                  onChange={setTimezone}
                  placeholder="Select timezone"
                  ariaLabel="Timezone"
                  className="w-full"
                />
              </div>
              <div className="flex gap-2 pt-2 justify-end">
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave} loading={saving} disabled={saving}>
                  Save
                </Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Name
                </p>
                <p className="mt-0.5 text-sm text-foreground">
                  {user.name || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Email
                </p>
                <p className="mt-0.5 text-sm text-foreground">
                  {user.email || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Phone
                </p>
                <p className="mt-0.5 text-sm text-foreground">
                  {user.phone || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Timezone
                </p>
                <p className="mt-0.5 text-sm text-foreground">
                  {TIMEZONE_OPTIONS.find((o) => o.value === user.timezone)
                    ?.label ??
                    user.timezone ??
                    "—"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
