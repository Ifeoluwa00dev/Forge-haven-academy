"use client";

import { useMemo, useState } from "react";
import ExportCsvButton from "@/components/ExportCsvButton";
import EditRegistrationModal from "@/components/EditRegistrationModal";
import { Pencil } from "lucide-react";

interface RegistrationRow {
  id: string;
  reference_number: string | null;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  payment_status: string;
  created_at: string;
  custom_field_answers: Record<string, string | boolean> | null;
  events: { title: string; custom_fields: { id: string; label: string }[] } | null;
  registration_children: { child_name: string; child_age: number | null }[];
}

export default function RegistrationsTable({
  registrations,
}: {
  registrations: RegistrationRow[];
}) {
  const eventTitles = useMemo(() => {
    const titles = new Set<string>();
    registrations.forEach((r) => {
      if (r.events?.title) titles.add(r.events.title);
    });
    return Array.from(titles);
  }, [registrations]);

  const [selectedEvent, setSelectedEvent] = useState<string>("all");
    const [editingRegistration, setEditingRegistration] = useState<RegistrationRow | null>(null);

  const filtered = useMemo(() => {
    if (selectedEvent === "all") return registrations;
    return registrations.filter((r) => r.events?.title === selectedEvent);
  }, [registrations, selectedEvent]);

  const csvRows = filtered.flatMap((r) =>
    (r.registration_children.length > 0
      ? r.registration_children
      : [{ child_name: "", child_age: null }]
    ).map((c) => ({
      reference_number: r.reference_number,
      parent_name: r.parent_name,
      parent_email: r.parent_email,
      parent_phone: r.parent_phone,
      payment_status: r.payment_status,
            event_title: r.events?.title || "",
      child_name: c.child_name,
      child_age: c.child_age,
      additional_info: r.custom_field_answers
        ? Object.entries(r.custom_field_answers)
            .map(([fieldId, value]) => {
              const fieldDef = r.events?.custom_fields?.find((f) => f.id === fieldId);
              const label = fieldDef?.label || fieldId;
              const displayValue = typeof value === "boolean" ? (value ? "Yes" : "No") : String(value);
              return `${label}: ${displayValue}`;
            })
            .join("; ")
        : "",
      created_at: r.created_at,
    }))
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-forge-black/70">
            Event:
          </label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="rounded-xl border border-black/15 px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-forge-orange"
          >
            <option value="all">All events ({registrations.length})</option>
            {eventTitles.map((title) => {
              const count = registrations.filter((r) => r.events?.title === title).length;
              return (
                <option key={title} value={title}>
                  {title} ({count})
                </option>
              );
            })}
          </select>
        </div>
        <ExportCsvButton rows={csvRows} />
      </div>

      {filtered.length === 0 && (
        <p className="text-forge-black/60">No registrations for this filter.</p>
      )}

      {filtered.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-black/10">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-forge-cream text-xs uppercase text-forge-black/60">
              <tr>
                <th className="px-4 py-3">Reference</th>
                <th className="px-4 py-3">Event</th>
                <th className="px-4 py-3">Parent</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Children</th>
                                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Additional info</th>
                <th className="px-4 py-3">Registered</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                                <tr key={r.id} className="border-t border-black/10 dark:border-white/10">
                  <td className="px-4 py-3 font-mono text-xs">{r.reference_number}</td>
                  <td className="px-4 py-3">{r.events?.title || "—"}</td>
                  <td className="px-4 py-3">{r.parent_name}</td>
                  <td className="px-4 py-3">
                    <div>{r.parent_email}</div>
                    <div className="text-forge-black/50">{r.parent_phone}</div>
                  </td>
                  <td className="px-4 py-3">
                    {r.registration_children.map((c, i) => (
                      <div key={i}>
                        {c.child_name}
                        {c.child_age != null ? ` (${c.child_age})` : ""}
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        r.payment_status === "paid" || r.payment_status === "free"
                          ? "bg-forge-orange/10 text-forge-orange-dark"
                          : "bg-black/5 text-forge-black/60"
                      }`}
                    >
                      {r.payment_status}
                    </span>
                  </td>
                                    <td className="px-4 py-3 text-xs text-forge-black/70 dark:text-white/70">
                    {r.custom_field_answers && Object.keys(r.custom_field_answers).length > 0
                      ? Object.entries(r.custom_field_answers).map(([fieldId, value]) => {
                          const fieldDef = r.events?.custom_fields?.find((f) => f.id === fieldId);
                          const label = fieldDef?.label || fieldId;
                          const displayValue =
                            typeof value === "boolean" ? (value ? "Yes" : "No") : String(value);
                          return (
                            <div key={fieldId}>
                              <strong>{label}:</strong> {displayValue}
                            </div>
                          );
                        })
                      : "—"}
                  </td>
                                                      <td className="px-4 py-3 text-forge-black/60 dark:text-white/60">
                    {new Date(r.created_at).toLocaleDateString("en-US")}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setEditingRegistration(r)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-forge-black/50 hover:text-forge-orange dark:text-white/50"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
            {editingRegistration && (
        <EditRegistrationModal
          registration={editingRegistration}
          onClose={() => setEditingRegistration(null)}
          onSaved={() => {
            setEditingRegistration(null);
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}