"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import type { CustomField } from "@/lib/custom-fields";

const inputClass =
  "w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-base outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface dark:text-white";

export default function FeedbackForm({
  eventId,
  questions,
}: {
  eventId: string;
  questions: CustomField[];
}) {
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const setAnswer = (id: string, value: string | boolean) =>
    setAnswers((a) => ({ ...a, [id]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    for (const q of questions) {
      if (q.required && !answers[q.id]) {
        setError(`Please answer: ${q.label}`);
        return;
      }
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, answers, name, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-forge-orange/20 bg-forge-orange/10 p-6 text-forge-orange-dark dark:text-forge-orange">
        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
        <p className="text-sm">Thank you! Your feedback has been recorded.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {questions.map((q) => (
        <div key={q.id}>
          <label className="mb-1 block text-sm font-semibold text-forge-black/70 dark:text-white/70">
            {q.label} {q.required && <span className="text-forge-orange">*</span>}
          </label>

          {q.type === "text" && (
            <input
              value={(answers[q.id] as string) || ""}
              onChange={(e) => setAnswer(q.id, e.target.value)}
              className={inputClass}
            />
          )}

          {q.type === "textarea" && (
            <textarea
              rows={3}
              value={(answers[q.id] as string) || ""}
              onChange={(e) => setAnswer(q.id, e.target.value)}
              className={inputClass}
            />
          )}

          {q.type === "select" && (
            <select
              value={(answers[q.id] as string) || ""}
              onChange={(e) => setAnswer(q.id, e.target.value)}
              className={inputClass}
            >
              <option value="">Select an option</option>
              {(q.options || []).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          {q.type === "checkbox" && (
            <label className="flex items-center gap-2 text-sm text-forge-black/70 dark:text-white/70">
              <input
                type="checkbox"
                checked={(answers[q.id] as boolean) || false}
                onChange={(e) => setAnswer(q.id, e.target.checked)}
              />
              Yes
            </label>
          )}
        </div>
      ))}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-forge-black/70 dark:text-white/70">
            Your name (optional)
          </label>
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-forge-black/70 dark:text-white/70">
            Your email (optional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
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
        {submitting ? "Submitting..." : "Submit feedback"}
      </button>
    </form>
  );
}