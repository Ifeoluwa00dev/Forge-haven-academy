import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import CreateEventForm from "@/components/CreateEventForm";
import DeleteEventButton from "@/components/DeleteEventButton";
import AdminNav from "@/components/AdminNav";

export const dynamic = "force-dynamic";

interface EventRow {
  id: string;
  title: string;
  dates_label: string;
  time_label: string;
  price: number;
  is_active: boolean;
  registrations: { count: number }[];
}

export default async function AdminEventsPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const { data, error } = await supabaseAdmin
    .from("events")
    .select("id, title, dates_label, time_label, price, is_active, registrations(count)")
    .order("created_at", { ascending: false });

  const events = (data as unknown as EventRow[]) || [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <AdminNav active="events" />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-medium">Manage events</h1>
      </div>

      <div className="mb-6">
        <CreateEventForm />
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Couldn&apos;t load events: {error.message}
        </p>
      )}

      {!error && events.length === 0 && (
        <p className="text-forge-black/60">No events yet — create one above.</p>
      )}

      {!error && events.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-black/10">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-forge-cream text-xs uppercase text-forge-black/60">
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
              {events.map((e) => {
                const regCount = e.registrations?.[0]?.count ?? 0;
                return (
                  <tr key={e.id} className="border-t border-black/10">
                    <td className="px-4 py-3 font-medium">{e.title}</td>
                    <td className="px-4 py-3 text-forge-black/70">
                      {e.dates_label} ({e.time_label})
                    </td>
                    <td className="px-4 py-3">
                      {e.price > 0 ? `$${e.price}` : "Free"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          e.is_active
                            ? "bg-forge-orange/10 text-forge-orange-dark"
                            : "bg-black/5 text-forge-black/50"
                        }`}
                      >
                        {e.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-forge-black/70">{regCount}</td>
                    <td className="px-4 py-3">
                      <DeleteEventButton
                        eventId={e.id}
                        eventTitle={e.title}
                        registrationCount={regCount}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}