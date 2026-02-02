"use server";

import { db } from "@/lib/db";
import { getUserById } from "@/server/user";
import bcrypt from "bcryptjs";

export const ChangePassword = async (password: string, userId: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await getUserById(userId);
  if (!user) return { error: "Unauthorized, Please login first" };

  const passwordCompare = await bcrypt.compare(password, user.password || "");
  if (passwordCompare) return { error: "Both passwords are one and the same" };

  await db.user.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
    },
  });

  return { success: "Password has been changed successfully!" };
};
