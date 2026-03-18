export default function DomainForReferrer(referrer: string | null) {
  if (!referrer) return "Direct";

  const value = referrer.trim();
  if (!value) return "Direct";

  try {
    const url = new URL(value);
    return url.hostname.replace(/^www\./, "").toLowerCase();
  } catch (error) {
    try {
      const url = new URL(value.startsWith("http") ? value : `http://${value}`);
      return url.host.toLowerCase();
    } catch {
      return "Direct";
    }
  }
}

export type ReferrerRow = {
  referrer: string;
  _count: { id: number };
};
