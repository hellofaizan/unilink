"use server";

import { resend } from "@/email/mail";
import WelcomeEmail from "@/email/welcomeemail";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/server/user";
import { getVerificationTokenByToken } from "@/tokens/vertoken";
import { success } from "zod";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) return { error: "Token not or just invalid" };
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired" };
  const user = await getUserByEmail(existingToken.email);
  if (!user) return { error: "User not found" };

  await db.user.update({
    where: { id: user.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  const firstName = user?.name?.split(" ")[0] || "there";

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "onboarding@resend.dev",
    to: user.email as string,
    subject: `Welcome to Unilink, ${firstName} – Let's Get Started!`,
    react: WelcomeEmail({
      firstName: user.name as string,
    }),
  });

  return { success: "Email has been verified" };
};
