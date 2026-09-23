import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { parent_name, parent_email, parent_phone, payment_status, children } =
    await req.json();

  const { error: regError } = await supabaseAdmin
    .from("registrations")
    .update({ parent_name, parent_email, parent_phone, payment_status })
    .eq("id", id);

  if (regError) {
    console.error("Update registration error:", regError);
    return NextResponse.json({ error: "Failed to update registration" }, { status: 500 });
  }

  // Replace the children rows entirely — simplest way to support
  // adding/removing/editing children in one save.
  if (Array.isArray(children)) {
    await supabaseAdmin.from("registration_children").delete().eq("registration_id", id);

    if (children.length > 0) {
      const rows = children.map((c: { child_name: string; child_age: number | null }) => ({
        registration_id: id,
        child_name: c.child_name,
        child_age: c.child_age,
      }));
      const { error: childError } = await supabaseAdmin
        .from("registration_children")
        .insert(rows);

      if (childError) {
        console.error("Update children error:", childError);
        return NextResponse.json(
          { error: "Registration updated, but children failed to save" },
          { status: 500 }
        );
      }
    }
  }

  return NextResponse.json({ success: true });
}