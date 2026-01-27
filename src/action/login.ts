"use server";

import { signIn } from "@/server/auth";
import bcrypt from "bcryptjs";
import { DEFAULT_LOGIN_REDIRECT } from "@/server/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/server/user";
import { sendVerificationEmail } from "@/email/mail";

export default async function LoginUser({ data }: { data: any }) {
  if (!data) return { error: "Enter a valid email and password" };
  const { email, password } = data;
  const existingUser = await getUserByEmail(email);
  const firstName = existingUser?.name?.split(" ")[0];

  if (!existingUser || !existingUser.email)
    return { error: "Email doen't exist" };

  if (!existingUser.password)
    return { error: "Email is linked to a Google account, Login with Google" };

  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch) return { error: "Invalid password, Please revalidate" };

  if (!existingUser.emailVerified) {
    const vertoken = await generateVerificationToken(existingUser.email);

    await sendVerificationEmail(
      vertoken.email,
      vertoken.token,
      firstName as string,
    );

    return {
      notVerified: "Email not verified, Confirmation email send successfully!",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "AccessDenied":
          return { error: "Access denied" };
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "An error occurred" };
      }
    }

    throw error;
  }

  return { success: "Account created successfully!" };
}
