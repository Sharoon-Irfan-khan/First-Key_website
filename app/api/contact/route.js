import { NextResponse } from "next/server";
import { sendMail, INBOXES } from "@/lib/email";
import { corporateServiceTitles } from "@/lib/corporateServices";

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

  // Enquiries from /corporate-services belong to First Key Corporate Services
  // DWC-LLC, a separate company — label them clearly so they are never mixed
  // up with real estate leads.
  const corporate = data.source === "corporate-services";
  if (corporate && !corporateServiceTitles.includes(data.service)) {
    return NextResponse.json(
      { ok: false, error: "Please choose the service you need." },
      { status: 400 }
    );
  }

  const result = await sendMail({
    to: corporate ? INBOXES.corporate : INBOXES.contact,
    subject: corporate
      ? `Corporate Services enquiry (${data.service}) — ${name}`
      : `New enquiry — ${name}`,
    replyTo: email,
    fields: corporate
      ? {
          Company: "First Key Corporate Services DWC-LLC",
          "Service required": data.service,
          Name: name,
          Phone: phone,
          Email: email,
          Message: data.message,
        }
      : {
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
