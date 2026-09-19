"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-forge-black/60 hover:text-forge-orange"
    >
      <LogOut className="h-4 w-4" />
      Log out
    </button>
  );
}