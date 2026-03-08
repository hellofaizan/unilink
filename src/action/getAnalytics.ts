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
      device: true,
    },
  });

  return viewsByDevice.map((entry) => ({
    device: entry.device || "Unknown",
    count: entry._count.device,
  }));
}

export async function ViewsByBrowser({ userId }: { userId: string }) {
  const viewsByBrowser = await db.pageVisits.groupBy({
    by: ["browser"],
    where: {
      userId,
    },
    _count: {
      browser: true,
    },
  });

  return viewsByBrowser.map((entry) => ({
    browser: entry.browser || "Unknown",
    count: entry._count.browser,
  }));
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
