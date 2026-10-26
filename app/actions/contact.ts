"use server";

import { Resend } from "resend";
import type { ContactState } from "@/lib/contact";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function sendContactEmail(
  _previousState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: ContactState["errors"] = {};

  if (name.length < 2) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (message.length < 10) {
    errors.message = "Write at least 10 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Fix the highlighted fields and try again.",
      errors,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      message: "Email is not configured yet. Please try again later.",
    };
  }

  const to =
    process.env.CONTACT_TO_EMAIL ??
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ??
    "nadhir.code@gmail.com";
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Company: ${company || "—"}`,
        `Email: ${email}`,
        "",
        message,
      ].join("\n"),
      html: `
        <h2>New contact form message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company || "—")}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        message: "Couldn't send your message. Please try again.",
      };
    }

    return {
      success: true,
      message: "Message sent. Thanks for reaching out.",
    };
  } catch (error) {
    console.error("Send contact email failed:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
