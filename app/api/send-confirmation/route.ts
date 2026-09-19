import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Server-only — RESEND_API_KEY is never exposed to the browser since this
// file runs in a Next.js Route Handler, not client-side code.
const resend = new Resend(process.env.RESEND_API_KEY);

// Until the real domain is verified in Resend, we send from the shared
// testing address. Swap this to e.g. "Forge Haven Academy <hello@forgehavenacademy.org>"
// once the domain is connected.
const FROM_ADDRESS = "Forge Haven Academy <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      parentEmail,
      parentName,
      eventTitle,
      referenceNumber,
      price,
      currency,
      datesLabel,
      timeLabel,
      location,
    } = body;

    if (!parentEmail || !referenceNumber) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const isPaid = price > 0;

    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: parentEmail,
      subject: `Registration received — ${eventTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #0a0a0a;">
          <h2 style="color: #ff6700;">Forge Haven Academy</h2>
          <p>Hi ${parentName || "there"},</p>
          <p>We've received your registration for <strong>${eventTitle}</strong>.</p>
          <div style="background: #faf9f7; border-radius: 12px; padding: 16px; margin: 20px 0;">
            <p style="margin: 4px 0;"><strong>Reference number:</strong> ${referenceNumber}</p>
            ${datesLabel ? `<p style="margin: 4px 0;"><strong>Date:</strong> ${datesLabel}${timeLabel ? ` (${timeLabel})` : ""}</p>` : ""}
            ${location ? `<p style="margin: 4px 0;"><strong>Location:</strong> ${location}</p>` : ""}
          </div>
          ${
            isPaid
              ? `<p>Payment collection for this event is being finalized — we'll follow up shortly with instructions to complete your $${price} ${currency} payment.</p>`
              : `<p>You're all set for this event — no payment required.</p>`
          }
          <p style="margin-top: 24px; color: #6b6b6b; font-size: 13px;">
            Please keep this reference number for check-in on the day of the event.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("send-confirmation route error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}