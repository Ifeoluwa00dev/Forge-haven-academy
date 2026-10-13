"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { DEFAULT_FEEDBACK_QUESTIONS, type CustomField } from "@/lib/custom-fields";

type EventInfo = { title: string; feedback_questions: CustomField[] | null };

export interface FeedbackRow {
  id: string;
  answers: Record<string, string | boolean> | null;
  respondent_name: string | null;
  respondent_email: string | null;
  created_at: string;
  events: EventInfo | EventInfo[] | null;
}

function eventOf(r: FeedbackRow): EventInfo | null {
  if (!r.events) return null;
  return Array.isArray(r.events) ? r.events[0] ?? null : r.events;
}

function questionsOf(r: FeedbackRow): CustomField[] {
  const q = eventOf(r)?.feedback_questions;
  return Array.isArray(q) && q.length > 0 ? q : DEFAULT_FEEDBACK_QUESTIONS;
}

function displayValue(v: string | boolean | undefined): string {
  if (v === undefined || v === "") return "";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  return v;
}

// Each answer paired with its question label. Answers to questions that were
// later edited out still show, under a generic label.
function entriesOf(r: FeedbackRow): { label: string; value: string }[] {
  const answers = r.answers ?? {};
  const qs = questionsOf(r);
  const known = new Set(qs.map((q) => q.id));
  const out = qs.map((q) => ({ label: q.label, value: displayValue(answers[q.id]) }));
  for (const [id, v] of Object.entries(answers)) {
    if (!known.has(id)) out.push({ label: "(removed question)", value: displayValue(v) });
  }
  return out;
}

// Quotes the cell and defuses spreadsheet formulas: feedback comes from the
// public, so a cell starting with = + - @ must not run when opened in Excel.
function csvCell(v: string): string {
  const s = /^[=+\-@\t\r]/.test(v) ? "'" + v : v;
  return `"${s.replace(/"/g, '""')}"`;
}

export default function FeedbackTable({ rows }: { rows: FeedbackRow[] }) {
  const [selected, setSelected] = useState("all");

  const titles = useMemo(
    () =>
      Array.from(
        new Set(rows.map((r) => eventOf(r)?.title).filter((t): t is string => Boolean(t)))
      ),
    [rows]
  );

  const filtered = useMemo(
    () => (selected === "all" ? rows : rows.filter((r) => eventOf(r)?.title === selected)),
    [rows, selected]
  );

  const handleExport = () => {
    const headers: string[] = [];
    const data = filtered.map((r) => {
      const map: Record<string, string> = {};
      for (const { label, value } of entriesOf(r)) {
        if (!headers.includes(label)) headers.push(label);
        map[label] = map[label] ? `${map[label]}; ${value}` : value;
      }
      return { r, map };
    });

    const lines = data.map(({ r, map }) =>
      [
        new Date(r.created_at).toISOString().slice(0, 10),
        eventOf(r)?.title ?? "",
        r.respondent_name ?? "",
        r.respondent_email ?? "",
        ...headers.map((h) => map[h] ?? ""),
      ]
        .map(csvCell)
        .join(",")
    );

    const csv = [["Date", "Event", "Name", "Email", ...headers].map(csvCell).join(","), ...lines].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `forge-haven-feedback-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-forge-black/70 dark:text-white/70">Event:</label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="rounded-xl border border-black/15 px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface dark:text-white"
          >
            <option value="all">All events ({rows.length})</option>
            {titles.map((t) => (
              <option key={t} value={t}>
                {t} ({rows.filter((r) => eventOf(r)?.title === t).length})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleExport}
          disabled={filtered.length === 0}
          className="inline-flex items-center gap-2 rounded-xl border border-black/15 px-4 py-2.5 text-sm font-medium transition-colors hover:border-forge-orange hover:text-forge-orange disabled:opacity-50 dark:border-white/15 dark:text-white"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {filtered.length === 0 && (
        <p className="text-forge-black/60 dark:text-white/60">No feedback yet.</p>
      )}

      <div className="space-y-4">
        {filtered.map((r) => {
          const answered = entriesOf(r).filter((e) => e.value !== "");
          return (
            <div
              key={r.id}
              className="rounded-2xl border border-black/10 p-5 dark:border-white/10 dark:bg-forge-surface"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-forge-black dark:text-white">
                    {eventOf(r)?.title ?? "Unknown event"}
                  </p>
                  <p className="text-sm text-forge-black/60 dark:text-white/60">
                    {r.respondent_name || r.respondent_email
                      ? [r.respondent_name, r.respondent_email].filter(Boolean).join(" · ")
                      : "Anonymous"}
                  </p>
                </div>
                <p className="text-sm text-forge-black/50 dark:text-white/50">
                  {new Date(r.created_at).toLocaleDateString("en-US", { timeZone: "UTC" })}
                </p>
              </div>

              <div className="mt-4 space-y-3">
                {answered.length === 0 && (
                  <p className="text-sm text-forge-black/50 dark:text-white/50">No answers.</p>
                )}
                {answered.map((e, i) => (
                  <div key={i}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-forge-black/50 dark:text-white/50">
                      {e.label}
                    </p>
                    <p className="whitespace-pre-wrap break-words text-sm text-forge-black dark:text-white">
                      {e.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}