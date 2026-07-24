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

  const { name, phone, email } = data || {};
  if (!name || !phone || !email) {
    return NextResponse.json(
      { ok: false, error: "Name, phone and email are required." },
      { status: 400 }
    );
  }

  const result = await sendMail({
    to: INBOXES.listing,
    subject: `New property listing — ${name}`,
    replyTo: email,
    fields: {
      "Owner name": name,
      Phone: phone,
      Email: email,
      "Property type": data.propertyType,
      Location: data.location,
      Bedrooms: data.bedrooms,
      "Size (sq ft)": data.size,
      "Asking price": data.price,
      Purpose: data.purpose,
      Notes: data.notes,
    },
  });

  if (!result.delivered && !result.skipped) {
    return NextResponse.json(
      { ok: false, error: "We couldn't send your details. Please try again or call us." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
