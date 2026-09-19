"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteEventButton({
  eventId,
  eventTitle,
  registrationCount,
}: {
  eventId: string;
  eventTitle: string;
  registrationCount: number;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const warning =
      registrationCount > 0
        ? `"${eventTitle}" has ${registrationCount} registration${registrationCount === 1 ? "" : "s"} attached. Deleting it will permanently delete those registrations too. This cannot be undone.\n\nType-confirm by pressing OK to proceed.`
        : `Delete "${eventTitle}"? This cannot be undone.`;

    if (!window.confirm(warning)) return;

    setDeleting(true);
    const res = await fetch(`/api/admin/events/${eventId}`, { method: "DELETE" });
    setDeleting(false);

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete event. Please try again.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-forge-black/50 hover:text-red-600 disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" />
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}