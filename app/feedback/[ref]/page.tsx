import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import FeedbackForm from "@/components/FeedbackForm";
import { DEFAULT_FEEDBACK_QUESTIONS, type CustomField } from "@/lib/custom-fields";

export const dynamic = "force-dynamic";

const COLUMNS = "id, title, feedback_open, feedback_questions";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function FeedbackPage({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  const { ref } = await params;

  let { data: event } = await supabaseAdmin
    .from("events")
    .select(COLUMNS)
    .eq("slug", ref)
    .maybeSingle();

  if (!event && UUID.test(ref)) {
    const res = await supabaseAdmin.from("events").select(COLUMNS).eq("id", ref).maybeSingle();
    event = res.data;
  }

  if (!event) notFound();

  const questions: CustomField[] =
    Array.isArray(event.feedback_questions) && event.feedback_questions.length > 0
      ? event.feedback_questions
      : DEFAULT_FEEDBACK_QUESTIONS;

  return (
    <div className="pb-20">
      <section className="border-b border-black/10 bg-forge-cream py-14 text-center dark:border-white/10">
        <div className="mx-auto max-w-2xl px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-forge-orange">
            Feedback
          </span>
          <h1 className="mt-3 text-3xl font-medium md:text-4xl">{event.title}</h1>
          <p className="mt-3 text-lg text-forge-black/70 dark:text-white/70">
            We would love to hear how it went.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-12">
        {event.feedback_open ? (
          <FeedbackForm eventId={event.id} questions={questions} />
        ) : (
          <p className="rounded-2xl border border-black/10 p-6 text-center text-forge-black/70 dark:border-white/10 dark:text-white/70">
            Feedback is not open for this event yet. Please check back soon.
          </p>
        )}
      </section>
    </div>
  );
}