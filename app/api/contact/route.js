import { NextResponse } from "next/server";
import { sendMail, INBOXES } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { name, email, phone } = data || {};
  if (!name || !email) {
    return NextResponse.json(
      { ok: false, error: "Name and email are required." },
      { status: 400 }
    );
  }

  const result = await sendMail({
    to: INBOXES.contact,
    subject: `New enquiry — ${name}`,
    replyTo: email,
    fields: {
      Name: name,
      Phone: phone,
      Email: email,
      "Interested in": data.interest,
      Message: data.message,
    },
  });

  if (!result.delivered && !result.skipped) {
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message. Please try again or call us." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
