import { NextResponse } from "next/server";
import { MailConfigError, sendMail } from "@/lib/mail";

const requiredFields = ["name", "email", "message"] as const;

const departmentRecipients = {
  booking: {
    label: "Booking",
    email: process.env.CONTACT_BOOKING_TO || process.env.CONTACT_TO || "booking@taruyamusic.com"
  },
  info: {
    label: "Info / prensa",
    email: process.env.CONTACT_INFO_TO || "info@taruyamusic.com"
  },
  legal: {
    label: "Legal",
    email: process.env.CONTACT_LEGAL_TO || "legal@taruyamusic.com"
  },
  accounting: {
    label: "Contabilidad",
    email: process.env.CONTACT_ACCOUNTING_TO || "contabilidad@taruyamusic.com"
  },
  royalties: {
    label: "Royalties",
    email: process.env.CONTACT_ROYALTIES_TO || "royalties@taruyamusic.com"
  },
  publishing: {
    label: "Publishing",
    email: process.env.CONTACT_PUBLISHING_TO || "publishing@taruyamusic.com"
  }
} as const;

type Department = keyof typeof departmentRecipients;
type SmtpError = Error & {
  code?: string;
  command?: string;
  responseCode?: number;
  response?: string;
};

export const runtime = "nodejs";

function clean(value: FormDataEntryValue | undefined) {
  return String(value || "").trim();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function resolveDepartment(value: string): (typeof departmentRecipients)[Department] {
  return departmentRecipients[value as Department] || departmentRecipients.booking;
}

function smtpErrorMessage(error: SmtpError) {
  if (error.code === "EAUTH" || error.responseCode === 535) {
    return "SMTP authentication failed";
  }

  if (error.code === "ETIMEDOUT" || error.code === "ECONNECTION") {
    return "SMTP connection failed";
  }

  return "Email failed";
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries()) as Record<string, FormDataEntryValue>;

  const missing = requiredFields.filter((field) => !clean(payload[field]));

  if (missing.length) {
    return NextResponse.json({ ok: false, missing }, { status: 400 });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const event = clean(payload.event);
  const message = clean(payload.message);
  const department = resolveDepartment(clean(payload.department));
  const receivedAt = new Date().toISOString();

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  try {
    const subject = `Nuevo contacto TARUYA: ${name}${event ? ` / ${event}` : ""}`;
    const text = [
      `Nuevo mensaje desde taruyamusic.com`,
      ``,
      `Area: ${department.label}`,
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Evento / ciudad: ${event || "No indicado"}`,
      `Fecha: ${receivedAt}`,
      ``,
      `Mensaje:`,
      message
    ].join("\n");

    const html = `
      <div style="font-family:Arial,sans-serif;background:#080808;color:#f5f5f5;padding:28px">
        <div style="max-width:680px;margin:0 auto;border:1px solid rgba(255,255,255,.14);padding:24px;background:#111">
          <p style="margin:0 0 12px;color:#b7ff4a;text-transform:uppercase;font-size:12px;letter-spacing:.12em">TARUYA / Esparragoza Music</p>
          <h1 style="margin:0 0 24px;font-size:24px;color:#fff">Nuevo mensaje de contacto</h1>
          <p><strong>Area:</strong> ${escapeHtml(department.label)}</p>
          <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color:#61dafb">${escapeHtml(email)}</a></p>
          <p><strong>Evento / ciudad:</strong> ${escapeHtml(event || "No indicado")}</p>
          <p><strong>Fecha:</strong> ${escapeHtml(receivedAt)}</p>
          <div style="margin-top:24px;padding:18px;background:#050505;border-left:4px solid #b7ff4a;white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</div>
        </div>
      </div>
    `;

    const sent = await sendMail({
      to: department.email,
      subject,
      html,
      text,
      replyTo: email
    });

    return NextResponse.json({
      ok: true,
      receivedAt,
      messageId: sent.messageId,
      lead: {
        name,
        email,
        event,
        department: department.label
      }
    });
  } catch (error) {
    if (error instanceof MailConfigError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    console.error("Contact email failed", error);
    return NextResponse.json({ ok: false, error: smtpErrorMessage(error as SmtpError) }, { status: 502 });
  }
}
