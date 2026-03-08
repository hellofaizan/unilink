import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");
  const linkId = searchParams.get("link");

  if (!userId || !linkId) {
    return NextResponse.json(
      { success: false, message: "Missing userId or linkId" },
      { status: 400 },
    );
  }

  console.log(`Recording click for userId: ${userId}, linkId: ${linkId}`);

  try {
    await db.linkClicks.create({
      data: {
        link: { connect: { id: linkId } },
        user: { connect: { id: userId } },
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error recording link click:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
