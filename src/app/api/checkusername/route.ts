import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username")?.toLowerCase();

  if (!username || !/^[a-z0-9-]{1,20}$/.test(username)) {
    return NextResponse.json({ available: false });
  }

  const exist = await db.user.findUnique({
    where: { username },
    select: { id: true },
  });

  return NextResponse.json({
    available: !exist,
  });
}
