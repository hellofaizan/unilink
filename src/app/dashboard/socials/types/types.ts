export type SocialLinkProps = {
  id: string;
  handle?: string | null;
  type: string;
  url?: string | null;
};

export type SocialCardViewModel = {
  id: string;
  platformName: string;
  icon: string;
  href: string;
  displayUrl: string;
  isCustom: boolean;
};
