import { NextRequest, NextResponse } from "next/server";
import { stripe, usdToNgnKobo } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const { registrationId } = await req.json();

    if (!registrationId) {
      return NextResponse.json({ error: "Missing registration id" }, { status: 400 });
    }

    // Everything that affects the amount is read from our own database,
    // never from the browser, so it can't be tampered with.
    const { data: registration, error: regError } = await supabaseAdmin
      .from("registrations")
      .select("id, event_id, parent_email, payment_status, events(title, price)")
      .eq("id", registrationId)
      .single();

    if (regError || !registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    if (registration.payment_status === "paid") {
      return NextResponse.json({ error: "Already paid" }, { status: 400 });
    }

    const event = Array.isArray(registration.events)
      ? registration.events[0]
      : registration.events;

    if (!event || !(event.price > 0)) {
      return NextResponse.json({ error: "This event has no fee" }, { status: 400 });
    }

    // One charge per child registered.
        const { count, error: countError } = await supabaseAdmin
      .from("registration_children")
      .select("*", { count: "exact", head: true })
      .eq("registration_id", registrationId);

    if (countError) {
      console.error("Child count failed:", countError);
      return NextResponse.json({ error: "Could not count children" }, { status: 500 });
    }

    const quantity = Math.max(1, count ?? 1);

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: registration.parent_email,
      line_items: [
        {
          price_data: {
            currency: "ngn",
            product_data: { name: event.title },
            unit_amount: usdToNgnKobo(event.price),
          },
          quantity,
        },
      ],
      metadata: {
        registration_id: registrationId,
        event_id: registration.event_id,
        children: String(quantity),
      },
      success_url: `${origin}/events/${registration.event_id}/success?registration_id=${registrationId}`,
      cancel_url: `${origin}/events/${registration.event_id}?payment=cancelled`,
    });

    await supabaseAdmin
      .from("registrations")
      .update({ payment_reference: session.id })
      .eq("id", registrationId);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("create-checkout-session error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}  