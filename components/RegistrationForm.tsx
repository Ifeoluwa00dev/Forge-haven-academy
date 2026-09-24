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

  const updateCustomAnswer = (fieldId: string, value: string | boolean) => {
    setCustomAnswers((a) => ({ ...a, [fieldId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!parentName || !parentEmail || !parentPhone) {
      setError("Please fill in your name, email, and phone number.");
      return;
    }

    // Name validation disabled — field is hidden per client request (Sep 2026).
    // if (children.some((c) => !c.name)) {
    //   setError("Please enter a name for each child.");
    //   return;
    // }

    for (const field of customFields) {
      if (field.required && !customAnswers[field.id]) {
        setError(`Please fill in: ${field.label}`);
        return;
      }
    }

    setSubmitting(true);

    const referenceNumber = `FHA-${Date.now().toString(36).toUpperCase()}`;
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
        return;
      } catch (checkoutErr) {
        console.error("Checkout error:", checkoutErr);
        setError(
          "Your registration was saved, but we couldn't start the payment step. Please contact us to complete payment."
        );
        return;
      }
    }

    if (redirectUrl) {
      const url = redirectUrl.startsWith("http") ? redirectUrl : `https://${redirectUrl}`;
      window.location.href = url;
      return;
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

      <div className="grid grid-cols-
