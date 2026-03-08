"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/server/user";

export default async function UnHideLink({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  if (!id) {
    return { success: false, message: "Link ID is required" };
  }

  try {
    await db.link.update({
      where: { id, userId },
      data: {
        isActive: data.isActive,
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false, message: "Failed to update link" };
  }
}

export async function HideLink({ id, data }: { id: string; data: any }) {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  if (!id) {
    return { success: false, message: "Link ID is required" };
  }

  try {
    await db.link.update({
      where: { id, userId },
      data: {
        isActive: data.isActive,
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false, message: "Failed to update link" };
  }
}
