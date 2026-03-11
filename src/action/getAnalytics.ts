"use server";

import { db } from "@/lib/db";

export async function ViewsToday({ userId }: { userId: string }) {
  console.log("Fetching analytics for user ID:", userId);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const end = new Date(today);
  end.setHours(23, 59, 59, 999);

  const viewsToday = await db.pageVisits.count({
    where: {
      userId,
      timestamp: {
        gte: today,
        lte: end,
      },
    },
  });

  return viewsToday;
}

export async function ViewsYesterday({ userId }: { userId: string }) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const end = new Date(yesterday);
  end.setHours(23, 59, 59, 999);

  const viewsYesterday = await db.pageVisits.count({
    where: {
      userId,
      timestamp: {
        gte: yesterday,
        lte: end,
      },
    },
  });

  return viewsYesterday;
}

export async function IndLinkClicks({
  userId,
  linkId,
}: {
  userId: string;
  linkId: string;
}) {
  const totalClicks = await db.linkClicks.count({
    where: {
      userId,
      linkId,
    },
  });

  return totalClicks;
}

export async function TotalLinkClicks({ userId }: { userId: string }) {
  const linksOfUser = await db.link.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      url: true,
      _count: {
        select: { linkClicks: true },
      },
    },
  });

  return linksOfUser;
}

export async function ViewsThisMonth({ userId }: { userId: string }) {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const viewsThisMonth = await db.pageVisits.count({
    where: {
      userId,
      timestamp: {
        gte: firstDayOfMonth,
      },
    },
  });

  return viewsThisMonth;
}

export async function ViewsLastMonth({ userId }: { userId: string }) {
  const today = new Date();
  const firstDayOfLastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1,
  );
  const lastDayOfLastMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    0,
    23,
    59,
    59,
    999,
  );

  const viewsLastMonth = await db.pageVisits.count({
    where: {
      userId,
      timestamp: {
        gte: firstDayOfLastMonth,
        lte: lastDayOfLastMonth,
      },
    },
  });

  return viewsLastMonth;
}

export async function TotalViews({ userId }: { userId: string }) {
  const totalViews = await db.pageVisits.count({
    where: {
      userId,
    },
  });

  return totalViews;
}

export async function UniqueVisitors({ userId }: { userId: string }) {
  const uniqueVisitors = await db.pageVisits.groupBy({
    by: ["ip"],
    where: {
      userId,
    },
  });

  return uniqueVisitors.length;
}

export async function ViewsByCountry({ userId }: { userId: string }) {
  const viewsByCountry = await db.pageVisits.groupBy({
    by: ["country"],
    where: {
      userId,
    },
    _count: {
      country: true,
    },
  });

  return viewsByCountry.map((entry) => ({
    country: entry.country || "Unknown",
    count: entry._count.country,
  }));
}

export async function ViewsByDevice({ userId }: { userId: string }) {
  const viewsByDevice = await db.pageVisits.groupBy({
    by: ["device"],
    where: {
      userId,
    },
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: "desc",
      },
    },
    take: 8,
  });

  return viewsByDevice;
}

export async function ViewsByBrowser({ userId }: { userId: string }) {
  const viewsByBrowser = await db.pageVisits.groupBy({
    by: ["browser"],
    where: {
      userId,
    },
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: "desc",
      },
    },
    take: 8,
  });

  return viewsByBrowser;
}

export async function ViewsByOS({ userId }: { userId: string }) {
  const viewsByOS = await db.pageVisits.groupBy({
    by: ["os"],
    where: {
      userId,
    },
    _count: {
      os: true,
    },
  });

  return viewsByOS.map((entry) => ({
    os: entry.os || "Unknown",
    count: entry._count.os,
  }));
}

export async function ViewsByReferrer({ userId }: { userId: string }) {
  const viewsByReferrer = await db.pageVisits.groupBy({
    by: ["referrerType"],
    where: {
      userId,
    },
    _count: {
      referrerType: true,
    },
  });

  return viewsByReferrer.map((entry) => ({
    referrerType: entry.referrerType || "Unknown",
    count: entry._count.referrerType,
  }));
}

export async function ViewsPast30Days({ userId }: { userId: string }) {
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
  thirtyDaysAgo.setHours(0, 0, 0, 0);

  const viewsByDay = new Map<string, number>();
  const uniqueByDay = new Map<string, Set<string>>();
  const currentDate = new Date(thirtyDaysAgo);

  while (currentDate <= today) {
    const dayKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
    viewsByDay.set(dayKey, 0);
    uniqueByDay.set(dayKey, new Set<string>());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const pageVisits = await db.pageVisits.findMany({
    where: {
      userId,
      timestamp: {
        gte: thirtyDaysAgo,
        lte: today,
      },
    },
    select: {
      timestamp: true,
      ip: true,
    },
  });

  pageVisits.forEach((visit) => {
    const date = new Date(visit.timestamp);
    const dayKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    viewsByDay.set(dayKey, (viewsByDay.get(dayKey) || 0) + 1);

    if (visit.ip) {
      const uniqueSet = uniqueByDay.get(dayKey);
      if (uniqueSet) {
        uniqueSet.add(visit.ip);
      }
    }
  });

  const result = Array.from(viewsByDay.entries()).map(([date, views]) => ({
    date,
    views,
    unique: uniqueByDay.get(date)?.size || 0,
  }));

  result.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return result;
}
