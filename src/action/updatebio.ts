"use server";

import { db } from "@/lib/db";
import { UpdateProfileResult } from "@/lib/errors/profile-error";
import { UpdateProfileSchema } from "@/schemas";
import { currentUser } from "@/server/user";

const DAY = 1000 * 60 * 60 * 24;

export default async function UpdateProfile(
  data: any,
): Promise<UpdateProfileResult> {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return {
      success: false,
      error: "UNAUTHORIZED",
    };
  }

  const parsed = UpdateProfileSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "INVALID_INPUT" };
  }

  const { name, bio, username } = parsed.data;

  const dbUser = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      usernameChangedAt: true,
    },
  });

  if (!dbUser) {
    return { success: false, error: "UNAUTHORIZED" };
  }
  let error: UpdateProfileResult | null = null;

  await db.$transaction(async (tx) => {
    //username change logic
    if (username && username !== dbUser?.username) {
      const normalized = username.toLowerCase();

      if (!/^[a-z0-9_]{1,20}$/.test(normalized)) {
        error = { success: false, error: "INVALID_USERNAME" };
      }

      // cooldown check
      if (
        dbUser.usernameChangedAt &&
        Date.now() - dbUser.usernameChangedAt.getTime() < DAY
      ) {
        error = { success: false, error: "USERNAME_COOLDOWN" };
      }

      const exists = await tx.user.findUnique({
        where: { username: normalized },
        select: { id: true },
      });

      if (exists) {
        error = { success: false, error: "USERNAME_TAKEN" };
      }

      await tx.user.update({
        where: { id: dbUser?.id },
        data: {
          username: normalized,
          usernameChangedAt: new Date(),
        },
      });
    }

    // Name Bio
    if (name || bio) {
      await tx.user.update({
        where: { id: dbUser?.id },
        data: {
          name,
          bio,
        },
      });
    }
  });

  if (error) return error;

  return { success: true };
}
