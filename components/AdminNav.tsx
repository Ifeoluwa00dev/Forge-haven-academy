import Link from "next/link";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export default function AdminNav({ active }: { active: "registrations" | "events" }) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4">
      <div className="flex gap-2">
        <Link
          href="/admin"
          className={`rounded-lg px-3.5 py-2 text-sm font-medium ${
            active === "registrations"
              ? "bg-forge-black text-white"
              : "text-forge-black/60 hover:bg-black/5"
          }`}
        >
          Registrations
        </Link>
        <Link
          href="/admin/events"
          className={`rounded-lg px-3.5 py-2 text-sm font-medium ${
            active === "events"
              ? "bg-forge-black text-white"
              : "text-forge-black/60 hover:bg-black/5"
          }`}
        >
          Events
        </Link>
      </div>
      <AdminLogoutButton />
    </div>
  );
}