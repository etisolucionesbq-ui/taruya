import nodemailer from "nodemailer";

type MailPayload = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export class MailConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MailConfigError";
  }
}

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new MailConfigError(`Missing ${name}`);
  }

  return value;
}

function numberEnv(name: string, fallback: number) {
  const value = process.env[name]?.trim();
  return value ? Number(value) : fallback;
}

function booleanEnv(name: string, fallback: boolean) {
  const value = process.env[name]?.trim().toLowerCase();

  if (!value) return fallback;
  return ["1", "true", "yes", "ssl"].includes(value);
}

function optionalListEnv(name: string) {
  return process.env[name]
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function sendMail({ to, subject, html, text, replyTo }: MailPayload) {
  const host = process.env.SMTP_HOST?.trim() || "smtp.hostinger.com";
  const port = numberEnv("SMTP_PORT", 465);
  const secure = booleanEnv("SMTP_SECURE", port === 465);
  const user = requiredEnv("SMTP_USER");
  const pass = requiredEnv("SMTP_PASS");
  const fromEmail = process.env.SMTP_FROM?.trim() || user;
  const fromName = process.env.SMTP_FROM_NAME?.trim() || "TARUYA Web";

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass }
  });

  return transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to,
    bcc: optionalListEnv("CONTACT_BCC"),
    subject,
    html,
    text,
    replyTo
  });
}

