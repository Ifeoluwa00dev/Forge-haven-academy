import { NextRequest, NextResponse } from "next/server";
import { stripe, usdToNgnKobo } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const { registrationId, eventId, eventTitle, priceUsd, parentEmail } =
      await req.json();

    if (!registrationId || !eventId || !priceUsd || !parentEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: parentEmail,
      line_items: [
        {
          price_data: {
            currency: "ngn",
            product_data: {
              name: eventTitle,
            },
            unit_amount: usdToNgnKobo(priceUsd),
          },
          quantity: 1,
        },
      ],
      metadata: {
        registration_id: registrationId,
        event_id: eventId,
      },
      success_url: `${origin}/events/${eventId}/success?registration_id=${registrationId}`,
      cancel_url: `${origin}/events/${eventId}?payment=cancelled`,
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