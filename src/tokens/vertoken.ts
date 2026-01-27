import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const vertoken = await db.verificationToken.findFirst({
      where: { email },
    });

    return vertoken;
  } catch (eroor) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const vertoken = await db.verificationToken.findFirst({
      where: { token },
    });

    return vertoken;
  } catch (error) {
    return null;
  }
};
