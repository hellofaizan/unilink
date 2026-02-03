"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/server/user";

type AddSocialResult = {
  success: Boolean;
  error?: string;
};

export async function AddSocial(data: {
  type: string;
  handle?: string;
  url?: string;
}): Promise<AddSocialResult> {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return { success: false, error: "UNAUTHORIZED" };
  }

  if (!data.type) {
    return { success: false, error: "Missing rquired fields" };
  }

  try {
    const existing = await db.socials.findFirst({
      where: {
        userId: userId,
        type: data.type,
      },
    });

    if (existing) {
      if (data.type == "custom") {
        await db.socials.update({
          where: { id: existing.id },
          data: {
            url: data.url,
          },
        });
      } else {
        await db.socials.update({
          where: { id: existing.id },
          data: {
            handle: data.handle,
          },
        });
      }
    } else {
      if (data.type == "custom") {
        await db.socials.create({
          data: {
            type: data.type,
            url: data.url,
            userId: userId,
          },
        });
      } else {
        await db.socials.create({
          data: {
            type: data.type,
            handle: data.handle,
            userId: userId,
          },
        });
      }
    }

    return { success: true };
  } catch (error) {
    console.log("Error adding social: ", error);
    return {
      success: false,
      error: "Failed to add social link",
    };
  }
}

export async function DeleteSocial(socialId: string) {
  const user = await currentUser();
  if (!user?.id) {
    return { success: false, error: "UNAUTHORIZED" };
  }

  try {
    await db.socials.delete({
      where: {
        id: socialId,
        userId: user?.id,
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete" };
  }
}

export async function GetSocials() {
  const user = await currentUser();
  if (!user?.id) {
    return { success: false, error: "UNAUTHORIZED" };
  }

  try {
    const data = await db.socials.findMany({
      where: {
        userId: user?.id,
      },
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to delete" };
  }
}
