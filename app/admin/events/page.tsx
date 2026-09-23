"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import CreateEventForm from "@/components/CreateEventForm";
import DeleteEventButton from "@/components/DeleteEventButton";
import AdminNav from "@/components/AdminNav";


interface EventRow {
  slug: string;
  redirect_url: string;
  id: string;
  title: string;
  description: string;
  audience: string;
  dates_label: string;
  time_label: string;
  location: string;
  facilitator_name: string | null;
  facilitator_role: string | null;
  price: number;
  currency: string;
  slots_total: number | null;
  is_active: boolean;
  registration_count?: number;
}

export default function AdminEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<any>(null);

    const loadEvents = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/events/list");
    const { events } = await res.json();

    setEvents(
      (events || []).map((e: any) => ({
        ...e,
        registration_count: e.registrations?.[0]?.count ?? 0,
      }))
    );
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const startEdit = (e: EventRow) => {
    setEditingEvent({
      id: e.id,
      title: e.title,
      slug: e.slug || "",
      redirect_url: e.redirect_url || "",
      custom_fields: e.custom_fields || [],
      description: e.description || "",
      audience: e.audience || "",
      dates_label: e.dates_label,
      time_label: e.time_label,
      location: e.location || "Onsite",
      facilitator_name: e.facilitator_name || "",
      facilitator_role: e.facilitator_role || "",
      price: String(e.price ?? 0),
      currency: e.currency || "USD",
      slots_total: e.slots_total ? String(e.slots_total) : "",
      is_active: e.is_active,
    });
  };

  const stopEdit = () => {
    setEditingEvent(null);
    loadEvents();
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <AdminNav active="events" />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-medium">Manage events</h1>
      </div>

      <div className="mb-6">
                <CreateEventForm
          key={editingEvent?.id || "new"}
          editingEvent={editingEvent}
          onDoneEditing={stopEdit}
        />
      </div>

      {loading && <p className="text-forge-black/60 dark:text-white/60">Loading...</p>}

      {!loading && events.length === 0 && (
        <p className="text-forge-black/60 dark:text-white/60">No events yet — create one above.</p>
      )}

      {!loading && events.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="bg-forge-cream text-xs uppercase text-forge-black/60 dark:text-white/60">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Registrations</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id} className="border-t border-black/10 dark:border-white/10">
                  <td className="px-4 py-3 font-medium">{e.title}</td>
                  <td className="px-4 py-3 text-forge-black/70 dark:text-white/70">
                    {e.dates_label} ({e.time_label})
                  </td>
                  <td className="px-4 py-3">{e.price > 0 ? `$${e.price}` : "Free"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        e.is_active
                          ? "bg-forge-orange/10 text-forge-orange-dark dark:text-forge-orange"
                          : "bg-black/5 text-forge-black/50 dark:bg-white/10 dark:text-white/50"
                      }`}
                    >
                      {e.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-forge-black/70 dark:text-white/70">
                    {e.registration_count}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => startEdit(e)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-forge-black/60 hover:text-forge-orange dark:text-white/60"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </button>
                      <DeleteEventButton
                        eventId={e.id}
                        eventTitle={e.title}
                        registrationCount={e.registration_count || 0}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}