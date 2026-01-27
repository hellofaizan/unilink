import { Resend } from "resend";
import VerificationEmail from "./verification";
import PasswordResetEmail from "./passwordreset";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
export const resend = new Resend(RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  token: string,
  firstname: string
) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_Website_URL}/new-verification?token=${token}`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "onboarding@resend.dev",
    to: email,
    subject: "Verify Your Email – Unilink",
    react: VerificationEmail({
      verificationLink: confirmLink,
      firstName: firstname,
    }),
  });
};

export const sendPasswordResetToken = async (
  email: string,
  token: string,
  firstname: string
) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_Website_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "onboarding@resend.dev",
    to: email,
    subject: "Reset Your Password – Unilink",
    react: PasswordResetEmail({
      verificationLink: confirmLink,
      firstName: firstname,
    }),
  });
};
