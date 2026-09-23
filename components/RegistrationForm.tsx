"use client";

import { useState } from "react";
import { Plus, Trash2, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { CustomField } from "@/lib/custom-fields";

interface Child {
  name: string;
  age: string;
}

export default function RegistrationForm({
  eventId,
  eventTitle,
  price,
  currency,
  datesLabel,
  timeLabel,
  location,
  redirectUrl,
  customFields = [],
}: {
  eventId: string;
  eventTitle: string;
  price: number;
  currency: string;
  datesLabel?: string;
  timeLabel?: string;
  location?: string;
  redirectUrl?: string;
  customFields?: CustomField[];
}) {
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [children, setChildren] = useState<Child[]>([{ name: "", age: "" }]);
    const [customAnswers, setCustomAnswers] = useState<Record<string, string | boolean>>({});

  const updateCustomAnswer = (fieldId: string, value: string | boolean) => {
    setCustomAnswers((a) => ({ ...a, [fieldId]: value }));
  };
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const addChild = () => setChildren((c) => [...c, { name: "", age: "" }]);
  const removeChild = (idx: number) =>
    setChildren((c) => c.filter((_, i) => i !== idx));
  const updateChild = (idx: number, field: keyof Child, value: string) =>
    setChildren((c) =>
      c.map((child, i) => (i === idx ? { ...child, [field]: value } : child))
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!parentName || !parentEmail || !parentPhone) {
      setError("Please fill in your name, email, and phone number.");
      return;
    }
    if (children.some((c) => !c.name)) {
      setError("Please enter a name for each child.");
      return;
    }
        for (const field of customFields) {
      if (field.required && !customAnswers[field.id]) {
        setError(`Please fill in: ${field.label}`);
        return;
      }
    }

    setSubmitting(true);

    const referenceNumber = `FHA-${Date.now().toString(36).toUpperCase()}`;
    // Generate the id ourselves so we never need to read the row back
    // (the anon role intentionally has no SELECT grant on registrations,
    // to keep parent/child data unreadable via the public API).
    const registrationId = crypto.randomUUID();

    const { error: regError } = await supabase.from("registrations").insert({
      id: registrationId,
      event_id: eventId,
      parent_name: parentName,
      parent_email: parentEmail,
      parent_phone: parentPhone,
      payment_status: price > 0 ? "pending" : "free",
      reference_number: referenceNumber,
      custom_field_answers: customAnswers,
    });

    if (regError) {
      setError("Something went wrong submitting your registration. Please try again.");
      setSubmitting(false);
      return;
    }

    const childRows = children.map((c) => ({
      registration_id: registrationId,
      child_name: c.name,
      child_age: c.age ? parseInt(c.age, 10) : null,
    }));

    const { error: childError } = await supabase
      .from("registration_children")
      .insert(childRows);

    setSubmitting(false);

    if (childError) {
      setError("Registration was saved, but there was an issue adding children. Please contact us.");
      return;
    }

    if (price > 0) {
      // Paid event: create a Stripe Checkout session and send the parent
      // there to pay. The confirmation email is sent by the webhook once
      // payment actually succeeds, not here.
      try {
        const res = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            registrationId,
            eventId,
            eventTitle,
            priceUsd: price,
            parentEmail,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.url) {
          throw new Error(data.error || "Failed to start checkout");
        }

        window.location.href = data.url;
        return; // navigating away — nothing else to do here
      } catch (checkoutErr) {
        console.error("Checkout error:", checkoutErr);
        setError(
          "Your registration was saved, but we couldn't start the payment step. Please contact us to complete payment."
        );
        return;
      }
    }

    // Free event — send confirmation immediately.
    try {
      await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentEmail,
          parentName,
          eventTitle,
          referenceNumber,
          price,
          currency,
          datesLabel,
          timeLabel,
          location,
        }),
      });
    } catch (emailErr) {
      console.error("Failed to send confirmation email:", emailErr);
    }

            if (redirectUrl) {
      const url = redirectUrl.startsWith("http") ? redirectUrl : `https://${redirectUrl}`;
      window.location.href = url;
      return;
    }

    setSuccess(`You're registered! Your reference number is ${referenceNumber}.`);
  };

  if (success) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-forge-orange/20 bg-forge-orange/10 p-6 text-forge-orange-dark">
        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
        <p className="text-sm">{success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-lg font-medium">Register for {eventTitle}</h2>
        <p className="mt-1 text-base text-forge-black/60 dark:text-white/60">
          You can register more than one child in this form.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-semibold text-forge-black/70 dark:text-white/70">
            Parent / guardian name
          </label>
          <input
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-base outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-forge-black/70 dark:text-white/70">
            Email
          </label>
          <input
            type="email"
            value={parentEmail}
            onChange={(e) => setParentEmail(e.target.value)}
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-base outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-forge-black/70 dark:text-white/70">
            Phone number
          </label>
          <input
            type="tel"
            value={parentPhone}
            onChange={(e) => setParentPhone(e.target.value)}
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-base outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-forge-black/70 dark:text-white/70">
            Child / children registering
          </label>
          <button
            type="button"
            onClick={addChild}
            className="inline-flex items-center gap-1 text-sm font-semibold text-forge-orange-dark hover:text-forge-orange dark:text-forge-orange"
          >
            <Plus className="h-3.5 w-3.5" /> Add another child
          </button>
        </div>

        {children.map((child, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 gap-3 rounded-xl border border-black/10 p-4 dark:border-white/10 sm:grid-cols-[1fr_120px_auto] sm:items-end"
          >
            <div>
              <label className="mb-1 block text-sm text-forge-black/60 dark:text-white/60">
                Child&apos;s name
              </label>
              <input
                value={child.name}
                onChange={(e) => updateChild(idx, "name", e.target.value)}
                className="w-full rounded-lg border border-black/15 px-3 py-2 text-base outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-forge-black/60 dark:text-white/60">Age</label>
              <input
                type="number"
                min={0}
                value={child.age}
                onChange={(e) => updateChild(idx, "age", e.target.value)}
                className="w-full rounded-lg border border-black/15 px-3 py-2 text-base outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface"
              />
            </div>
            {children.length > 1 && (
              <button
                type="button"
                onClick={() => removeChild(idx)}
                className="inline-flex items-center justify-center gap-1 rounded-lg border border-black/10 px-3 py-2 text-sm text-forge-black/60 hover:border-red-300 hover:text-red-600 dark:border-white/15 dark:text-white/60"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            )}
          </div>
        ))}
            </div>

      {customFields.length > 0 && (
        <div className="space-y-4">
          <label className="text-sm font-semibold text-forge-black/70 dark:text-white/70">
            Additional information
          </label>
          {customFields.map((field) => (
            <div key={field.id}>
              <label className="mb-1 block text-sm text-forge-black/60 dark:text-white/60">
                {field.label} {field.required && <span className="text-forge-orange">*</span>}
              </label>

              {field.type === "text" && (
                <input
                  value={(customAnswers[field.id] as string) || ""}
                  onChange={(e) => updateCustomAnswer(field.id, e.target.value)}
                  className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-base outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface"
                />
              )}

              {field.type === "textarea" && (
                <textarea
                  value={(customAnswers[field.id] as string) || ""}
                  onChange={(e) => updateCustomAnswer(field.id, e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-base outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface"
                />
              )}

              {field.type === "select" && (
                <select
                  value={(customAnswers[field.id] as string) || ""}
                  onChange={(e) => updateCustomAnswer(field.id, e.target.value)}
                  className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-base outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface"
                >
                  <option value="">Select an option</option>
                  {(field.options || []).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {field.type === "checkbox" && (
                <label className="flex items-center gap-2 text-sm text-forge-black/70 dark:text-white/70">
                  <input
                    type="checkbox"
                    checked={(customAnswers[field.id] as boolean) || false}
                    onChange={(e) => updateCustomAnswer(field.id, e.target.checked)}
                  />
                  Yes
                </label>
              )}
            </div>
          ))}
        </div>
      )}

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
        {submitting
          ? "Submitting..."
          : price > 0
          ? `Continue — $${price} per child`
          : "Complete registration"}
      </button>
    </form>
  );
}