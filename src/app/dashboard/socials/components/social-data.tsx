export type SocialPlatform = {
  id: string;
  name: string;
  icon: string;
  baseUrl: string;
};

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
    {
        id: "github",
        name: "Github",
        icon: "/socials/github.svg",
        baseUrl: "github.com/"
    },
    {
        id: "linkedin",
        name: "LinkedIn",
        icon: "/socials/linkedin.svg",
        baseUrl: "linkedin.com/in/"
    },
]