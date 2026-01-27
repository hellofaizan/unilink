import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "@/tokens/vertoken";
import { getPasswordResetTokenByEmail } from "@/tokens/resetpass";
import { db } from "./db";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  // TODO: Set the expiration time to 30 minutes
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const vertoken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return vertoken;
};

export const generatePasswordToken = async (email: string) => {
  const token = uuidv4();
  // TODO: Set the expiration time to 30 minutes
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.resetPasswordToken.delete({
      where: { id: existingToken.id },
    });
  }

  const resetToken = await db.resetPasswordToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return resetToken;
};
