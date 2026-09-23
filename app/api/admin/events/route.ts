import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  if (!title || !dates_label || !time_label) {
    return NextResponse.json(
      { error: "Title, dates, and time are required." },
      { status: 400 }
    );
  }

    const { error } = await supabaseAdmin.from("events").insert({
    title,
    slug: body.slug || null,
    redirect_url: body.redirect_url || null,
    description: description || "",
    audience: audience || "",
    dates_label,
    time_label,
    location: location || "Onsite",
    facilitator_name: facilitator_name || null,
    facilitator_role: facilitator_role || null,
    price: price ? Number(price) : 0,
    currency: currency || "USD",
    slots_total: slots_total ? Number(slots_total) : null,
    slots_remaining: slots_total ? Number(slots_total) : null,
    is_active: is_active !== false,
  });

  if (error) {
    console.error("Create event error:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}