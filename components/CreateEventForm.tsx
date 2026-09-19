"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function CreateEventForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    audience: "",
    dates_label: "",
    time_label: "",
    location: "Onsite",
    facilitator_name: "",
    facilitator_role: "",
    price: "0",
    currency: "USD",
    slots_total: "",
  });

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.title || !form.dates_label || !form.time_label) {
      setError("Title, dates, and time are required.");
      return;
    }

    setSubmitting(true);

    const res = await fetch("/api/admin/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSubmitting(false);

    if (!res.ok) {
      setError("Something went wrong creating the event.");
      return;
    }

    setForm({
      title: "",
      description: "",
      audience: "",
      dates_label: "",
      time_label: "",
      location: "Onsite",
      facilitator_name: "",
      facilitator_role: "",
      price: "0",
      currency: "USD",
      slots_total: "",
    });
    setOpen(false);
    router.refresh();
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-forge-orange px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forge-orange-dark"
      >
        <Plus className="h-4 w-4" />
        New event
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 space-y-4 rounded-2xl border border-black/10 p-6"
    >
      <h2 className="text-lg font-medium">Create a new event</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-forge-black/70">
            Title *
          </label>
          <input
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-forge-black/70">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-forge-black/70">
            Audience
          </label>
          <input
            value={form.audience}
            onChange={(e) => update("audience", e.target.value)}
            placeholder="e.g. Preteens & teens"
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-forge-black/70">
            Location
          </label>
          <input
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-forge-black/70">
            Dates *
          </label>
          <input
            value={form.dates_label}
            onChange={(e) => update("dates_label", e.target.value)}
            placeholder="e.g. Nov 14–15, 2026"
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-forge-black/70">
            Time *
          </label>
          <input
            value={form.time_label}
            onChange={(e) => update("time_label", e.target.value)}
            placeholder="e.g. 11:00am – 12:00noon"
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-forge-black/70">
            Facilitator name
          </label>
          <input
            value={form.facilitator_name}
            onChange={(e) => update("facilitator_name", e.target.value)}
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-forge-black/70">
            Facilitator role
          </label>
          <input
            value={form.facilitator_role}
            onChange={(e) => update("facilitator_role", e.target.value)}
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-forge-black/70">
            Price (0 = free)
          </label>
          <input
            type="number"
            min={0}
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-forge-black/70">
            Total slots (leave blank = unlimited)
          </label>
          <input
            type="number"
            min={0}
            value={form.slots_total}
            onChange={(e) => update("slots_total", e.target.value)}
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange"
          />
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-forge-orange px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forge-orange-dark disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Create event"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-xl border border-black/15 px-5 py-2.5 text-sm font-medium hover:border-black/30"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}