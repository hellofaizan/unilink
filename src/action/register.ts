"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/server/user";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/email/mail";
import { signup } from "@/schemas";
import { generateUniqueUsername } from "@/lib/username";

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
  const { error } = signup.safeParse(data);
  if (error) {
    return { error: error.message };
  }

  const username = await generateUniqueUsername(name, async (candidate) => {
    const existing = await db.user.findUnique({
      where: { username: candidate },
      select: { id: true },
    });
    return Boolean(existing);
  });

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      username,
    },
  });

  const vertoken = await generateVerificationToken(email);
  await sendVerificationEmail(
    vertoken.email,
    vertoken.token,
    firstname as string,
  );

  return { success: "Confirmation email sent successfully!" };
}
