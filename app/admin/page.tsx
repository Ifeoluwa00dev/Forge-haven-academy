import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import AdminNav from "@/components/AdminNav";
import RegistrationsTable from "@/components/RegistrationsTable";

export const dynamic = "force-dynamic";

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

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

    const { data, error } = await supabaseAdmin
    .from("registrations")
    .select(
      "id, reference_number, parent_name, parent_email, parent_phone, payment_status, created_at, custom_field_answers, events(title, custom_fields), registration_children(child_name, child_age)"
    )
    .order("created_at", { ascending: false });

  const registrations = (data as unknown as RegistrationRow[]) || [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <AdminNav active="registrations" />

      <div className="mb-6">
        <h1 className="text-2xl font-medium">Registrations</h1>
        <p className="mt-1 text-sm text-forge-black/60">
          {registrations.length} total registration{registrations.length === 1 ? "" : "s"}
        </p>
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Couldn&apos;t load registrations: {error.message}
        </p>
      )}

      {!error && <RegistrationsTable registrations={registrations} />}
    </div>
  );
}