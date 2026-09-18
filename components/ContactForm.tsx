"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !message) {
      setError("Please fill in every field.");
      return;
    }

    setSubmitting(true);

    const { error: insertError } = await supabase
      .from("contact_messages")
      .insert({ name, email, message });

    setSubmitting(false);

    if (insertError) {
      setError("Something went wrong sending your message. Please try again.");
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-forge-orange/20 bg-forge-orange/10 p-6 text-forge-orange-dark">
        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
        <p className="text-sm">
          Thanks for reaching out — we&apos;ve received your message and will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-xs font-semibold text-forge-black/70">
          Your name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange"
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-forge-black/70">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange"
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-forge-black/70">
          Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange"
          required
        />
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-forge-orange px-6 py-3.5 font-medium text-white transition-colors hover:bg-forge-orange-dark disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}