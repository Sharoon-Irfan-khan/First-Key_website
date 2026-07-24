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

  const { name, email } = data || {};
  if (!name || !email) {
    return NextResponse.json(
      { ok: false, error: "Name and email are required." },
      { status: 400 }
    );
  }

  const result = await sendMail({
    to: INBOXES.careers,
    subject: `Career application — ${name}${data.role ? ` (${data.role})` : ""}`,
    replyTo: email,
    fields: {
      Name: name,
      Email: email,
      Phone: data.phone,
      "Role of interest": data.role,
      Message: data.message,
    },
  });

  if (!result.delivered && !result.skipped) {
    return NextResponse.json(
      { ok: false, error: "We couldn't send your application. Please try again or email us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
