import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = "Forge Haven Academy <hello@forgehavenacademy.com>";

export interface ConfirmationEmailParams {
  parentEmail: string;
  parentName?: string;
  eventTitle: string;
  referenceNumber: string;
  price: number;
  currency: string;
  datesLabel?: string;
  timeLabel?: string;
  location?: string;
  paymentConfirmed?: boolean;
}

export async function sendRegistrationConfirmation(params: ConfirmationEmailParams) {
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
    paymentConfirmed,
  } = params;

  const isPaid = price > 0;

  const paymentLine = !isPaid
    ? `<p>You're all set for this event — no payment required.</p>`
    : paymentConfirmed
    ? `<p>Your payment has been received — you're fully registered.</p>`
    : `<p>Payment collection for this event is being finalized — we'll follow up shortly with instructions to complete your payment.</p>`;

  return resend.emails.send({
    from: FROM_ADDRESS,
    to: parentEmail,
    subject: `Registration received — ${eventTitle}`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #0a0a0a;">
        <h2 style="color: #ff6700;">Forge Haven Academy</h2>
        <p>Hi ${parentName || "there"},</p>
        <p>We've received your registration for <strong>${eventTitle}</strong>.</p>
        <div style="background: #faf9f7; border-radius: 12px; padding: 16px; margin: 20px 0;">
          <!-- Reference number hidden per client request (Sep 2026): <p style="margin: 4px 0;"><strong>Reference number:</strong> ${referenceNumber}</p> -->
          ${datesLabel ? `<p style="margin: 4px 0;"><strong>Date:</strong> ${datesLabel}${timeLabel ? ` (${timeLabel})` : ""}</p>` : ""}
          ${location ? `<p style="margin: 4px 0;"><strong>Location:</strong> ${location}</p>` : ""}
        </div>
        ${paymentLine}
        <p style="margin-top: 24px; color: #6b6b6b; font-size: 13px;">
          Please keep this reference number for check-in on the day of the event.
        </p>
      </div>
    `,
  });
}
