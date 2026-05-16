"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { motion } from "motion/react";
import Image from "next/image";

const platforms = [
  { name: "YouTube", icon: "/socials/youtube.svg" },
  { name: "Twitter", icon: "/socials/twitter.svg" },
  { name: "Spotify", icon: "/socials/spotify.svg" },
  { name: "LinkedIn", icon: "/socials/linkedin.svg" },
  { name: "Twitch", icon: "/socials/twitch.svg" },
  { name: "GitLab", icon: "/socials/gitlab.svg" },
  { name: "Substack", icon: "/socials/substack.svg" },
  { name: "PayPal", icon: "/socials/paypal.svg" },
  { name: "Kick", icon: "/socials/kick.svg" },
  { name: "SoundCloud", icon: "/socials/soundcloud.svg" },
];

export function IntegrationsSection() {
  return (
    <section className="relative w-full overflow-hidden py-20 md:py-28">
      <AnimatedGridPattern
        numSquares={40}
        maxOpacity={0.12}
        duration={3}
        className="text-primary/30 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <BlurFade inView>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Integrations
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Connect every platform your audience uses
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground md:text-lg">
              Plug in 40+ social and content platforms with branded icons—no
              code, no complicated setup.
            </p>
          </BlurFade>

          <BlurFade inView delay={0.1}>
            <div className="relative mx-auto grid max-w-md grid-cols-4 gap-3 sm:gap-4">
              {platforms.map((platform, i) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="flex aspect-square items-center justify-center rounded-2xl border border-border/60 bg-card/90 p-4 shadow-sm backdrop-blur-sm"
                >
                  <Image
                    src={platform.icon}
                    alt={platform.name}
                    width={32}
                    height={32}
                    className="opacity-90"
                  />
                </motion.div>
              ))}
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
