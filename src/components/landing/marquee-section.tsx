"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";

const platforms = [
  { name: "YouTube", icon: "/socials/youtube.svg" },
  { name: "Twitter", icon: "/socials/twitter.svg" },
  { name: "Spotify", icon: "/socials/spotify.svg" },
  { name: "LinkedIn", icon: "/socials/linkedin.svg" },
  { name: "Twitch", icon: "/socials/twitch.svg" },
  { name: "GitLab", icon: "/socials/gitlab.svg" },
  { name: "Substack", icon: "/socials/substack.svg" },
  { name: "Kick", icon: "/socials/kick.svg" },
  { name: "SoundCloud", icon: "/socials/soundcloud.svg" },
  { name: "PayPal", icon: "/socials/paypal.svg" },
];

function PlatformBadge({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="mx-2 flex items-center gap-3 rounded-full border border-border/60 bg-card px-5 py-2.5 shadow-sm">
      <Image src={icon} alt={name} width={22} height={22} className="opacity-90" />
      <span className="text-sm font-medium text-foreground">{name}</span>
    </div>
  );
}

export function MarqueeSection() {
  return (
    <section className="relative w-full border-y border-border/50 bg-muted/30 py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <BlurFade inView delay={0}>
          <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
            Connect the platforms your audience already uses
          </p>
        </BlurFade>
      </div>

      <Marquee pauseOnHover className="[--duration:35s] [--gap:0.5rem]">
        {platforms.map((p) => (
          <PlatformBadge key={p.name} {...p} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="mt-3 [--duration:40s] [--gap:0.5rem]">
        {[...platforms].reverse().map((p) => (
          <PlatformBadge key={`rev-${p.name}`} {...p} />
        ))}
      </Marquee>
    </section>
  );
}
