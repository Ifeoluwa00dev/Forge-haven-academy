import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { sendRegistrationConfirmation } from "@/lib/send-confirmation-email";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const registrationId = session.metadata?.registration_id;

    if (registrationId) {
      const { data: registration, error: updateError } = await supabaseAdmin
        .from("registrations")
        .update({ payment_status: "paid" })
        .eq("id", registrationId)
        .select(
          "reference_number, parent_name, parent_email, events(title, price, currency, dates_label, time_label, location)"
        )
        .single();

      if (updateError) {
        console.error("Failed to update registration after payment:", updateError);
      } else if (registration) {
        const evt = Array.isArray(registration.events)
          ? registration.events[0]
          : registration.events;

        try {
          await sendRegistrationConfirmation({
            parentEmail: registration.parent_email,
            parentName: registration.parent_name,
            eventTitle: evt?.title || "your event",
            referenceNumber: registration.reference_number || "",
            price: evt?.price ?? 0,
            currency: evt?.currency ?? "USD",
            datesLabel: evt?.dates_label,
            timeLabel: evt?.time_label,
            location: evt?.location,
            paymentConfirmed: true,
          });
        } catch (emailErr) {
          console.error("Failed to send payment confirmation email:", emailErr);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}