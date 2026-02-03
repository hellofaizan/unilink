import { SOCIAL_PLATFORMS, SocialPlatform } from "../components/social-data";
import { SocialCardViewModel, SocialLinkProps } from "./types";

export function getPlatformMeta(type: string): SocialPlatform | undefined {
  return SOCIAL_PLATFORMS.find((platform) => platform.id === type);
}

export function mapLinkToCardData(
  link: SocialLinkProps,
): SocialCardViewModel | null {
  const platform = getPlatformMeta(link.type);

  if (!platform && link.type !== "custom") return null;

  const isCustom = platform?.isCustom || link.type === "custom";

  if (isCustom) {
    const raw = (link.url || link.handle || "").trim();
    if (!raw) return null;

    const href =
      raw.startsWith("http://") || raw.startsWith("https://")
        ? raw
        : `https://${raw}`;

    const displayUrl = href.replace(/^https?:\/\//, "");

    return {
      id: link.id,
      platformName: platform?.name || "Custom URL",
      icon: platform?.icon || "globe",
      href,
      displayUrl,
      isCustom: true,
    };
  }

  if (!platform) return null;

  const handle = link.handle?.trim();
  if (!handle) return null;

  const href = `https://${platform.baseUrl}${handle}`;
  const displayUrl = `${platform.baseUrl}${handle}`;

  return {
    id: link.id,
    platformName: platform.name,
    icon: platform.icon,
    href,
    displayUrl,
    isCustom: false,
  };
}

export function mapLinksToCards(
  links: SocialLinkProps[],
): SocialCardViewModel[] {
  return links
    .map(mapLinkToCardData)
    .filter((card): card is SocialCardViewModel => card !== null);
}