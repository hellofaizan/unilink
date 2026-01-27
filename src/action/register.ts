"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/server/user";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/email/mail";

export default async function RegisterUser({ data }: { data: any }) {
  if (!data) {
    return { error: "Enter a valid email and password" };
  }

  const { name, email, password } = data;
  const firstname = name?.split(" ")[0];
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use, Please login in." };
  }

  // TODO: CHECK email and password schema using @/schemas/index.ts (register)

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const vertoken = await generateVerificationToken(email);
  await sendVerificationEmail(vertoken.email, vertoken.token, firstname as string);

  return { success: "Confirmation email sent successfully!" };
}
