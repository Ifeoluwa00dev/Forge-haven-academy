"use client";

import { Download } from "lucide-react";

interface Row {
  reference_number: string | null;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  payment_status: string;
  event_title: string;
  child_name: string;
  child_age: number | null;
  created_at: string;
}

function toCsv(rows: Row[]): string {
  const headers = [
    "Reference",
    "Event",
    "Parent Name",
    "Parent Email",
    "Parent Phone",
    "Payment Status",
    "Child Name",
    "Child Age",
    "Registered At",
  ];

  const escape = (v: string | number | null) =>
    `"${String(v ?? "").replace(/"/g, '""')}"`;

  const lines = rows.map((r) =>
    [
      r.reference_number,
      r.event_title,
      r.parent_name,
      r.parent_email,
      r.parent_phone,
      r.payment_status,
      r.child_name,
      r.child_age,
      r.created_at,
    ]
      .map(escape)
      .join(",")
  );

  return [headers.map(escape).join(","), ...lines].join("\n");
}

export default function ExportCsvButton({ rows }: { rows: Row[] }) {
  const handleExport = () => {
    const csv = toCsv(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `forge-haven-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 rounded-xl border border-black/15 px-4 py-2.5 text-sm font-medium transition-colors hover:border-forge-orange hover:text-forge-orange"
    >
      <Download className="h-4 w-4" />
      Export CSV
    </button>
  );
}