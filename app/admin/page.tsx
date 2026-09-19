import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import ExportCsvButton from "@/components/ExportCsvButton";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export const dynamic = "force-dynamic";

interface RegistrationRow {
  id: string;
  reference_number: string | null;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  payment_status: string;
  created_at: string;
  events: { title: string } | null;
  registration_children: { child_name: string; child_age: number | null }[];
}

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const { data, error } = await supabaseAdmin
    .from("registrations")
    .select(
      "id, reference_number, parent_name, parent_email, parent_phone, payment_status, created_at, events(title), registration_children(child_name, child_age)"
    )
    .order("created_at", { ascending: false });

  const registrations = (data as unknown as RegistrationRow[]) || [];

  const csvRows = registrations.flatMap((r) =>
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
      created_at: r.created_at,
    }))
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium">Registrations</h1>
          <p className="mt-1 text-sm text-forge-black/60">
            {registrations.length} registration{registrations.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ExportCsvButton rows={csvRows} />
          <AdminLogoutButton />
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Couldn&apos;t load registrations: {error.message}
        </p>
      )}

      {!error && registrations.length === 0 && (
        <p className="text-forge-black/60">No registrations yet.</p>
      )}

      {!error && registrations.length > 0 && (
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
                <th className="px-4 py-3">Registered</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r.id} className="border-t border-black/10">
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
                  <td className="px-4 py-3 text-forge-black/60">
                    {new Date(r.created_at).toLocaleDateString()}
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