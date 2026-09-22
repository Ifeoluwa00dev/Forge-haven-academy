import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export default async function RegistrationSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ registration_id?: string }>;
}) {
  const { registration_id } = await searchParams;

  let referenceNumber: string | null = null;

  if (registration_id) {
    const { data } = await supabaseAdmin
      .from("registrations")
      .select("reference_number, payment_status")
      .eq("id", registration_id)
      .single();
    referenceNumber = data?.reference_number ?? null;
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forge-orange/10 text-forge-orange">
        <CheckCircle className="h-7 w-7" />
      </div>
      <h1 className="mt-5 text-2xl font-medium">Payment received</h1>
      <p className="mt-2 text-forge-black/70">
        Your registration is confirmed. A confirmation email is on its way.
      </p>
      {referenceNumber && (
        <p className="mt-4 rounded-xl bg-forge-cream px-4 py-2 font-mono text-sm">
          {referenceNumber}
        </p>
      )}
      <Link
        href="/"
        className="mt-8 rounded-xl bg-forge-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-forge-orange-dark"
      >
        Back to home
      </Link>
    </div>
  );
}