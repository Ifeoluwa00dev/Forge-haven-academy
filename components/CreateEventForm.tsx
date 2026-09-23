"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil } from "lucide-react";
import CustomFieldsEditor from "@/components/CustomFieldsEditor";
import type { CustomField } from "@/lib/custom-fields";

interface EventFormData {
  id?: string;
  title: string;
  slug: string;
  redirect_url: string;
   custom_fields: CustomField[];
  description: string;
  audience: string;
  dates_label: string;
  time_label: string;
  location: string;
  facilitator_name: string;
  facilitator_role: string;
  price: string;
  currency: string;
  slots_total: string;
  is_active: boolean;
}

const EMPTY_FORM: EventFormData = {
  title: "",
  slug: "",
  redirect_url: "",
  custom_fields: [],
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
  is_active: true,
};

export default function CreateEventForm({
  editingEvent,
  onDoneEditing,
}: {
  editingEvent?: EventFormData | null;
  onDoneEditing?: () => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(!!editingEvent);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<EventFormData>(editingEvent || EMPTY_FORM);

  const isEditing = !!editingEvent;

  const update = (field: keyof EventFormData, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.title || !form.dates_label || !form.time_label) {
      setError("Title, dates, and time are required.");
      return;
    }

    setSubmitting(true);

    const res = await fetch(
      isEditing ? `/api/admin/events/${form.id}` : "/api/admin/events",
      {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    setSubmitting(false);

    if (!res.ok) {
      setError(`Something went wrong ${isEditing ? "updating" : "creating"} the event.`);
      return;
    }

    if (isEditing) {
      onDoneEditing?.();
    } else {
      setForm(EMPTY_FORM);
      setOpen(false);
    }
    router.refresh();
  };

  const handleCancel = () => {
    if (isEditing) {
      onDoneEditing?.();
    } else {
      setOpen(false);
    }
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
      className="mb-8 space-y-4 rounded-2xl border border-black/10 p-6 dark:border-white/10 dark:bg-forge-surface"
    >
      <h2 className="flex items-center gap-2 text-lg font-medium">
        {isEditing && <Pencil className="h-4 w-4" />}
        {isEditing ? `Edit "${editingEvent?.title}"` : "Create a new event"}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-forge-black/70 dark:text-white/70">
            Title *
          </label>
          <input
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface-alt"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-forge-black/70 dark:text-white/70">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface-alt"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-forge-black/70 dark:text-white/70">
            Audience
          </label>
          <input
            value={form.audience}
            onChange={(e) => update("audience", e.target.value)}
            placeholder="e.g. Preteens & teens"
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface-alt"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-forge-black/70 dark:text-white/70">
            Location
          </label>
          <input
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface-alt"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-forge-black/70 dark:text-white/70">
            Dates *
          </label>
          <input
            value={form.dates_label}
            onChange={(e) => update("dates_label", e.target.value)}
            placeholder="e.g. Nov 14–15, 2026"
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface-alt"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-forge-black/70 dark:text-white/70">
            Time *
          </label>
          <input
            value={form.time_label}
            onChange={(e) => update("time_label", e.target.value)}
            placeholder="e.g. 11:00am – 12:00noon"
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface-alt"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-forge-black/70 dark:text-white/70">
            Facilitator name
          </label>
          <input
            value={form.facilitator_name}
            onChange={(e) => update("facilitator_name", e.target.value)}
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface-alt"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-forge-black/70 dark:text-white/70">
            Facilitator role
          </label>
          <input
            value={form.facilitator_role}
            onChange={(e) => update("facilitator_role", e.target.value)}
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface-alt"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-forge-black/70 dark:text-white/70">
            Price (0 = free)
          </label>
          <input
            type="number"
            min={0}
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface-alt"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-forge-black/70 dark:text-white/70">
            Total slots (leave blank = unlimited)
          </label>
          <input
            type="number"
            min={0}
            value={form.slots_total}
            onChange={(e) => update("slots_total", e.target.value)}
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface-alt"
          />
        </div>
                <div className="sm:col-span-2">
          <CustomFieldsEditor
            fields={form.custom_fields}
            onChange={(fields) => update("custom_fields" as any, fields as any)}
          />
        </div>
                <div>
          <label className="mb-1 block text-xs font-semibold text-forge-black/70 dark:text-white/70">
            Custom URL (optional)
          </label>
          <input
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            placeholder="e.g. parentsletstalk"
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface-alt"
          />
          <p className="mt-1 text-xs text-forge-black/50 dark:text-white/50">
            Leave blank to use the default link. If filled, the page becomes forgehavenacademy.com/[this value]
          </p>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-forge-black/70 dark:text-white/70">
            Redirect link after registration (optional)
          </label>
          <input
            value={form.redirect_url}
            onChange={(e) => update("redirect_url", e.target.value)}
            placeholder="e.g. a WhatsApp group invite link"
            className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface-alt"
          />
          <p className="mt-1 text-xs text-forge-black/50 dark:text-white/50">
            If filled, parents are sent here immediately after successfully registering, instead of seeing a confirmation message.
          </p>
        </div>

        {isEditing && (
          <div className="flex items-center gap-2 sm:col-span-2">
            <input
              type="checkbox"
              id="is_active"
              checked={form.is_active}
              onChange={(e) => update("is_active", e.target.checked)}
              className="h-4 w-4"
            />
            <label htmlFor="is_active" className="text-sm text-forge-black/70 dark:text-white/70">
              Active (visible on the public Events page)
            </label>
          </div>
        )}
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
          {submitting ? "Saving..." : isEditing ? "Save changes" : "Create event"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-xl border border-black/15 px-5 py-2.5 text-sm font-medium hover:border-black/30 dark:border-white/15"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}