"use server";

import { db } from "@/lib/db";
import { getUserById } from "@/server/user";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const DeleteAccountAction = async (id: string) => {
  const user = await getUserById(id);
  if (!user) return { success: false, error: "Session expired, Login again!" };

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: {
      imageKey: true,
    },
  });

  if (dbUser?.imageKey) {
    await utapi.deleteFiles(dbUser.imageKey);
  }

  await db.user.delete({ where: { id: user.id } });

  return { success: "Account deleted successfully!" };
};
