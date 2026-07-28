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

  // A message that wasn't delivered — for any reason, including email not being
  // configured — must surface as an error. Reporting success would show the
  // visitor a thank-you while the enquiry is silently lost.
  if (!result.delivered) {
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message. Please try again or call us." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
