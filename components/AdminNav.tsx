import Link from "next/link";
import AdminLogoutButton from "@/components/AdminLogoutButton";

const TABS = [
  { key: "registrations", href: "/admin", label: "Registrations" },
  { key: "events", href: "/admin/events", label: "Events" },
  { key: "feedback", href: "/admin/feedback", label: "Feedback" },
] as const;

export default function AdminNav({ active }: { active: (typeof TABS)[number]["key"] }) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4 dark:border-white/10">
      <div className="flex gap-2">
        {TABS.map((tab) => (
          <Link
            key={tab.key}
            href={tab.href}
            className={`rounded-lg px-3.5 py-2 text-sm font-medium ${
              active === tab.key
                ? "bg-forge-black text-white dark:bg-forge-orange"
                : "text-forge-black/60 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
      <AdminLogoutButton />
    </div>
  );
}