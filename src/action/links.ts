"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/server/user";
import { z } from "zod";

const CreateLinkSchema = z.object({
  title: z.string().min(1).max(200),
  url: z.string().url(),
});

type CreateLinkInput = z.infer<typeof CreateLinkSchema>;

type LinkResult =
  | { success: true }
  | { success: false; error: string };

export async function CreateLink(data: CreateLinkInput): Promise<LinkResult> {
  const user = await currentUser();

  if (!user?.id) {
    return {
      success: false,
      error: "UNAUTHORIZED",
    };
  }

  const parsed = CreateLinkSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error: "INVALID_INPUT",
    };
  }

  const { title, url } = parsed.data;

  try {
    // Find the next position for this user's independent links
    const maxPosition = await db.link.findFirst({
      where: {
        userId: user.id,
        collectionId: null,
      },
      orderBy: {
        position: "desc",
      },
      select: {
        position: true,
      },
    });

    const nextPosition =
      maxPosition?.position !== null && maxPosition?.position !== undefined
        ? maxPosition.position + 1
        : 0;

    await db.link.create({
      data: {
        userId: user.id,
        title,
        url,
        isActive: true,
        position: nextPosition,
        collectionId: null,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating link:", error);
    return {
      success: false,
      error: "INTERNAL_ERROR",
    };
  }
}

export async function GetLinks() {
  const user = await currentUser();

  if (!user?.id) {
    return {
      success: false,
      error: "UNAUTHORIZED",
    };
  }

  try {
    const links = await db.link.findMany({
      where: {
        userId: user.id,
        collectionId: null,
      },
      orderBy: {
        position: "asc",
      },
    });

    return {
      success: true,
      data: links,
    };
  } catch (error) {
    console.error("Error fetching links:", error);
    return {
      success: false,
      error: "INTERNAL_ERROR",
    };
  }
}

export async function ReorderLinks(order: string[]): Promise<LinkResult> {
  const user = await currentUser();

  if (!user?.id) {
    return {
      success: false,
      error: "UNAUTHORIZED",
    };
  }

  try {
    await db.$transaction(
      order.map((id, index) =>
        db.link.updateMany({
          where: {
            id,
            userId: user.id,
            collectionId: null,
          },
          data: {
            position: index,
          },
        }),
      ),
    );

    return { success: true };
  } catch (error) {
    console.error("Error reordering links:", error);
    return {
      success: false,
      error: "INTERNAL_ERROR",
    };
  }
}

