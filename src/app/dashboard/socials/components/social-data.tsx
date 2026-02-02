export type SocialPlatform = {
  id: string;
  name: string;
  icon: string;
  baseUrl: string;
  isCustom?: boolean;
};

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: "snapchat",
    name: "Snapchat",
    icon: "/socials/snapchat.svg",
    baseUrl: "snapchat.com/add/",
  },
  {
    id: "youtube",
    name: "Youtube",
    icon: "/socials/youtube.svg",
    baseUrl: "youtube.com/",
  },
  {
    id: "discord",
    name: "Discord",
    icon: "/socials/discord.svg",
    baseUrl: "discord.com/",
  },
  {
    id: "peerlist",
    name: "Peerlist",
    icon: "/socials/peerlist.svg",
    baseUrl: "peerlist.com/",
  },
  {
    id: "producthunt",
    name: "Product Hunt",
    icon: "/socials/producthunt.svg",
    baseUrl: "producthunt.com/",
  },
  {
    id: "spotify",
    name: "Spotify",
    icon: "/socials/spotify.svg",
    baseUrl: "open.spotify.com/",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "/socials/instagram.svg",
    baseUrl: "instagram.com/",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    icon: "/socials/pinterest.svg",
    baseUrl: "pinterest.com/",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: "/socials/twitter.svg",
    baseUrl: "x.com/",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "/socials/tiktok.svg",
    baseUrl: "tiktok.com/",
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: "/socials/telegram.svg",
    baseUrl: "t.me/",
  },
  {
    id: "substack",
    name: "Substack",
    icon: "/socials/substack.svg",
    baseUrl: "substack.com/",
  },
  {
    id: "soundcloud",
    name: "Soundcloud",
    icon: "/socials/soundcloud.svg",
    baseUrl: "soundcloud.com/",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: "/socials/paypal.svg",
    baseUrl: "paypal.me/",
  },
  {
    id: "github",
    name: "Github",
    icon: "/socials/github.svg",
    baseUrl: "github.com/",
  },
  {
    id: "slack",
    name: "Slack",
    icon: "/socials/slack.svg",
    baseUrl: "",
  },
  {
    id: "apple-music",
    name: "Apple Music",
    icon: "/socials/apple-music.svg",
    baseUrl: "music.apple.com/",
  },
  {
    id: "gitlab",
    name: "GitLab",
    icon: "/socials/gitlab.svg",
    baseUrl: "gitlab.com/",
  },
  {
    id: "twitch",
    name: "Twitch",
    icon: "/socials/twitch.svg",
    baseUrl: "twitch.tv/",
  },
  {
    id: "leetcode",
    name: "Leetcode",
    icon: "/socials/leetcode.svg",
    baseUrl: "leetcode.com/u/",
  },
  {
    id: "reddit",
    name: "Reddit",
    icon: "/socials/reddit.svg",
    baseUrl: "reddit.com/",
  },
  {
    id: "vk",
    name: "VK",
    icon: "/socials/vk.svg",
    baseUrl: "vk.com/",
  },
  {
    id: "namemc",
    name: "NameMC",
    icon: "/socials/namemc.svg",
    baseUrl: "namemc.com/",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "/socials/linkedin.svg",
    baseUrl: "linkedin.com/",
  },
  {
    id: "hackerrank",
    name: "HackerRank",
    icon: "/socials/hackerrank.svg",
    baseUrl: "hackerrank.com/profile/",
  },
  {
    id: "steam",
    name: "Steam",
    icon: "/socials/steam.svg",
    baseUrl: "steamcommunity.com/id/",
  },
  {
    id: "kick",
    name: "Kick",
    icon: "/socials/kick.svg",
    baseUrl: "kick.com/",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    icon: "/socials/pinterest.svg",
    baseUrl: "pinterest.com/",
  },
  {
    id: "buy-me-a-coffee",
    name: "Buy Me A Coffee",
    icon: "/socials/bmc.svg",
    baseUrl: "buymeacoffee.com/",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "/socials/facebook.svg",
    baseUrl: "facebook.com/",
  },
  {
    id: "gumroad",
    name: "Gumroad",
    icon: "/socials/gumroad.svg",
    baseUrl: "gumroad.com/",
  },
  {
    id: "email",
    name: "Email",
    icon: "/socials/gmail.svg",
    baseUrl: "mailto:",
  },
  {
    id: "whatsapp",
    name: "Whatsapp",
    icon: "/socials/whatsapp.svg",
    baseUrl: "wa.me/",
  },
  {
    id: "appstore",
    name: "App Store",
    icon: "/socials/appstore.svg",
    baseUrl: "apps.apple.com/developer/",
  },
  {
    id: "bluesky",
    name: "Blue Sky",
    icon: "/socials/bluesky.svg",
    baseUrl: "bsky.app/profile/",
  },
  {
    id: "codeforces",
    name: "Code Forces",
    icon: "/socials/codeforces.svg",
    baseUrl: "codeforces.com/profile/",
  },
  {
    id: "dailydev",
    name: "Daily Dev",
    icon: "/socials/dailydev.svg",
    baseUrl: "app.daily.dev/",
  },
  {
    id: "dribbble",
    name: "Dribbble",
    icon: "/socials/dribbble.svg",
    baseUrl: "dribbble.com/",
  },
  {
    id: "google-play",
    name: "Google Play Store",
    icon: "/socials/googleplay.svg",
    baseUrl: "play.google.com/store/apps/dev?id=",
  },
  {
    id: "hashnode",
    name: "Hashnode",
    icon: "/socials/hashnode.svg",
    baseUrl: "hashnode.com/",
  },
  {
    id: "modrinth",
    name: "Modrinth",
    icon: "/socials/modrinth.svg",
    baseUrl: "modrinth.com/user/",
  },
  {
    id: "custom",
    name: "Custom URL",
    icon: "globe",
    baseUrl: "https://",
    isCustom: true,
  },
];
