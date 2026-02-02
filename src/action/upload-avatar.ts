"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/server/user";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function UploadAvatar(imageUrl: string, imageKey: string) {
  const user = await currentUser();

  if (!user?.id) {
    return { success: false, error: "You are not authorized" };
  }

  if (!imageUrl || typeof imageUrl !== "string") {
    return { success: false, error: "Something went wrong!" };
  }

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: {
      imageKey: true,
    },
  });

  if (dbUser?.imageKey) {
    await utapi.deleteFiles(dbUser.imageKey);
  }

  await db.user.update({
    where: { id: user?.id },
    data: {
      image: imageUrl,
      imageKey: imageKey,
    },
  });

  return { success: true };
}
