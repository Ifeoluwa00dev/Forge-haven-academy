"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setSubmitting(false);

    if (!res.ok) {
      setError("Incorrect password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-2xl border border-black/10 p-8 shadow-sm"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forge-orange/10 text-forge-orange">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="text-lg font-medium">Admin access</h1>
          <p className="text-sm text-forge-black/60">
            Enter the admin password to view registrations.
          </p>
        </div>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange"
        />

        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-forge-black px-6 py-3 font-medium text-white transition-colors hover:bg-forge-black/85 disabled:opacity-60"
        >
          {submitting ? "Checking..." : "Enter"}
        </button>
      </form>
    </div>
  );
}