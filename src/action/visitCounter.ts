"use server";

import { db } from "@/lib/db";
import axios from "axios";
import { UAParser } from "ua-parser-js";

interface Props {
  userId: string;
  request_headers: Headers;
}

export default async function VisitCounter({ userId, request_headers }: Props) {
  const userAgent = request_headers.get("user-agent") || "";
  const ip = request_headers.get("x-forwarded-for") || "";
  const referrer = request_headers.get("referer") || "";
  const language = request_headers.get("accept-language") || "";

  if (!userId) {
    return { success: false, message: "User ID is required" };
  }

  if (referrer === "http://localhost:3000/") {
    return;
  }

  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser();
  const os = parser.getOS();
  const device = parser.getDevice();

  let longitude: number | null = null;
  let latitude: number | null = null;
  let city: string | null = null;
  let country: string | null = null;

  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    const data = response.data;
    longitude = data.lon;
    latitude = data.lat;
    city = data.city;
    country = data.country;
  } catch (error) {
    console.error("Error fetching geolocation data:", error);
  }

  let referrerType = "Unknown";
  let referrerURL = "";

  if (referrer === "") {
    referrerType = "Direct";
  } else {
    referrerType = "External";
    referrerURL = referrer;
  }

  const data = {
    ip,
    browser: browser.name,
    browserVersion: browser.version,
    os: os.name,
    osVersion: os.version,
    device: device.type,
    referrer,
    referrerType,
    referrerURL,
    language,
    longitude,
    latitude,
    city,
    country,
  };

  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined),
  );

  await db.pageVisits.create({
    data: {
      user: { connect: { id: userId } },
      ...filteredData,
    },
  });

  return { success: true };
}
