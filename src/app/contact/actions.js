"use server";

import nodemailer from "nodemailer";
import { env } from "@/lib/env";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let cachedTransporter = null;

function getTransporter() {
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.gmailUser,
        pass: env.gmailAppPassword
      }
    });
  }
  return cachedTransporter;
}

// Mirrors the client-side maxLength attributes — those are a UX nicety,
// not a security boundary, since any direct POST can skip the browser
// entirely. This is the real limit.
const MAX_LENGTHS = {
  name: 120,
  company: 120,
  email: 180,
  phone: 30,
  message: 2000
};

/**
 * Validates and delivers the enquiry via Gmail SMTP. Never reports success
 * without a working delivery path — see GMAIL_USER / GMAIL_APP_PASSWORD in
 * .env.example. Until those are set, a genuine, well-formed submission still
 * gets an honest error pointing people to call or WhatsApp directly, rather
 * than a fake "message sent".
 */
export async function submitEnquiry(_prevState, formData) {
  // Honeypot — real users never fill this in; bots that auto-fill every
  // field will, so we quietly no-op instead of revealing the check.
  if (String(formData.get("website") ?? "").trim()) {
    return {
      status: "success",
      message: "Thanks — we'll be in touch shortly."
    };
  }
  const name = String(formData.get("name") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  if (!name || !email || !phone || !message) {
    return {
      status: "error",
      message: "Please fill in your name, email, phone and message."
    };
  }
  if (name.length > MAX_LENGTHS.name || company.length > MAX_LENGTHS.company || email.length > MAX_LENGTHS.email || phone.length > MAX_LENGTHS.phone || message.length > MAX_LENGTHS.message) {
    return {
      status: "error",
      message: "One of the fields is too long. Please shorten it and try again."
    };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return {
      status: "error",
      message: "Please enter a valid email address."
    };
  }
  if (!env.gmailUser || !env.gmailAppPassword) {
    return {
      status: "error",
      message: "This form isn't connected to an email service yet. Please call or WhatsApp us directly using the details on this page."
    };
  }

  try {
    await getTransporter().sendMail({
      from: `"HashTech Website" <${env.gmailUser}>`,
      to: env.contactEmailTo,
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
      text: [`Name: ${name}`, `Company: ${company || "-"}`, `Email: ${email}`, `Phone: ${phone}`, "", "Message:", message].join("\n"),
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company || "-"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `
    });
  } catch {
    return {
      status: "error",
      message: "We couldn't send your message right now. Please call or WhatsApp us directly using the details on this page."
    };
  }

  return {
    status: "success",
    message: "Thanks — we'll be in touch shortly."
  };
}
