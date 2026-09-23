import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Deleting an event also removes its registrations and their children,
  // via the "on delete cascade" set up in the schema.
  const { error } = await supabaseAdmin.from("events").delete().eq("id", id);

  if (error) {
    console.error("Delete event error:", error);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  const {
    title,
    description,
    audience,
    dates_label,
    time_label,
    location,
    facilitator_name,
    facilitator_role,
    price,
    currency,
    slots_total,
    is_active,
  } = body;

  const { error } = await supabaseAdmin
    .from("events")
        .update({
      title,
      slug: body.slug || null,
      redirect_url: body.redirect_url || null,
      custom_fields: body.custom_fields || [],
      description,
      audience,
      dates_label,
      time_label,
      location,
      facilitator_name: facilitator_name || null,
      facilitator_role: facilitator_role || null,
      price: price !== undefined ? Number(price) : undefined,
      currency,
      slots_total: slots_total ? Number(slots_total) : null,
      is_active,
    })
    .eq("id", id);

  if (error) {
    console.error("Update event error:", error);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}