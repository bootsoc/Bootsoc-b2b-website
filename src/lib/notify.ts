import "server-only";

type Notice = { subject: string; text: string; replyTo?: string };

/**
 * Sends an internal notification email about a new submission.
 * Uses Resend when RESEND_API_KEY is set, otherwise SMTP when SMTP_HOST is set.
 * Silently skips when neither is configured; submissions are always stored in Neon first.
 */
export async function notifyTeam({ subject, text, replyTo }: Notice) {
  const to = process.env.NOTIFY_TO ?? "sayhi@bootsoc.com";
  const from = process.env.NOTIFY_FROM ?? "BootSoc Website <website@bootsoc.com>";

  try {
    if (process.env.RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to: to.split(","), subject, text, reply_to: replyTo }),
      });
      return;
    }
    if (process.env.SMTP_HOST) {
      const nodemailer = await import("nodemailer");
      const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 465),
        secure: (process.env.SMTP_PORT ?? "465") === "465",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transport.sendMail({ from, to, subject, text, replyTo });
    }
  } catch (error) {
    console.error("[notify] failed", error);
  }
}
