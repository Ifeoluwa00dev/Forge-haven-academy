import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { DEFAULT_FEEDBACK_QUESTIONS, type CustomField } from "@/lib/custom-fields";

export async function POST(req: NextRequest) {
  try {
    const { eventId, answers, name, email } = await req.json();

    if (!eventId || typeof answers !== "object" || answers === null) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { data: event } = await supabaseAdmin
      .from("events")
      .select("id, feedback_open, feedback_questions")
      .eq("id", eventId)
      .maybeSingle();

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    if (!event.feedback_open) {
      return NextResponse.json({ error: "Feedback is not open for this event" }, { status: 403 });
    }

    const questions: CustomField[] =
      Array.isArray(event.feedback_questions) && event.feedback_questions.length > 0
        ? event.feedback_questions
        : DEFAULT_FEEDBACK_QUESTIONS;

    // Keep only answers to this event's real questions, cleaned and length-limited.
    const cleaned: Record<string, string | boolean> = {};
    for (const q of questions) {
      const raw = answers[q.id];

      if (q.type === "checkbox") {
        if (q.required && raw !== true) {
          return NextResponse.json({ error: `Please answer: ${q.label}` }, { status: 400 });
        }
        cleaned[q.id] = raw === true;
        continue;
      }

      const value = typeof raw === "string" ? raw.trim().slice(0, 2000) : "";
      if (q.required && !value) {
        return NextResponse.json({ error: `Please answer: ${q.label}` }, { status: 400 });
      }
      if (q.type === "select" && value && !(q.options || []).includes(value)) {
        return NextResponse.json({ error: `Invalid answer for: ${q.label}` }, { status: 400 });
      }
      if (value) cleaned[q.id] = value;
    }

    const { error } = await supabaseAdmin.from("feedback_responses").insert({
      event_id: eventId,
      answers: cleaned,
      respondent_name:
        typeof name === "string" && name.trim() ? name.trim().slice(0, 200) : null,
      respondent_email:
        typeof email === "string" && email.trim() ? email.trim().slice(0, 200) : null,
    });

    if (error) {
      console.error("Feedback insert error:", error);
      return NextResponse.json({ error: "Could not save feedback" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("feedback route error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}