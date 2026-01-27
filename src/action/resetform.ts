"use server";

import { sendPasswordResetToken } from "@/email/mail";
import { generatePasswordToken } from "@/lib/tokens";
import { getUserByEmail } from "@/server/user";

export const ResetPass = async (email: string) => {
  if (!email) return { error: "Invalid Email" };

  const existingUser = await getUserByEmail(email);
  const firstname = existingUser?.name?.split(" ")[0];

  if (!existingUser) return { error: "Email not registered!" };

  const passwordresettoken = await generatePasswordToken(email);
  await sendPasswordResetToken(
    passwordresettoken.email,
    passwordresettoken.token,
    firstname as string,
  );

  return { success: "Password reset email has been sent to " + email };
};
