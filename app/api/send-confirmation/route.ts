import { NextRequest, NextResponse } from "next/server";
import { sendRegistrationConfirmation } from "@/lib/send-confirmation-email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { parentEmail, referenceNumber } = body;

    if (!parentEmail || !referenceNumber) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { error } = await sendRegistrationConfirmation(body);

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