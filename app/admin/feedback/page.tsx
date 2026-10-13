import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import AdminNav from "@/components/AdminNav";
import FeedbackTable, { type FeedbackRow } from "@/components/FeedbackTable";

export const dynamic = "force-dynamic";

export default async function AdminFeedbackPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const { data, error } = await supabaseAdmin
    .from("feedback_responses")
    .select(
      "id, answers, respondent_name, respondent_email, created_at, events(title, feedback_questions)"
    )
    .order("created_at", { ascending: false });

  const rows = (data as unknown as FeedbackRow[]) || [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <AdminNav active="feedback" />

      <div className="mb-6">
        <h1 className="text-2xl font-medium text-forge-black dark:text-white">Feedback</h1>
        <p className="mt-1 text-sm text-forge-black/60 dark:text-white/60">
          {rows.length} total response{rows.length === 1 ? "" : "s"}
        </p>
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Couldn&apos;t load feedback: {error.message}
        </p>
      )}

      {!error && <FeedbackTable rows={rows} />}
    </div>
  );
}