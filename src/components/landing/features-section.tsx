"use client";

import SpotlightCard from "@/components/SpotlightCard";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  GripVertical,
  Link2,
  Palette,
  Share2,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Unlimited links",
    description:
      "Add links, collections, and thumbnails. Drag to reorder and toggle visibility in one click.",
    spotlight: "rgba(99, 102, 241, 0.18)" as const,
    featured: false,
  },
  {
    icon: Share2,
    title: "40+ social platforms",
    description:
      "Connect Instagram, YouTube, X, Spotify, GitHub, and more with branded icons on your page.",
    spotlight: "rgba(168, 85, 247, 0.2)" as const,
    featured: true,
  },
  {
    icon: BarChart3,
    title: "Built-in analytics",
    description:
      "Track visits, clicks, referrers, devices, and geography so you know what resonates.",
    spotlight: "rgba(236, 72, 153, 0.18)" as const,
    featured: false,
  },
  {
    icon: Palette,
    title: "Profile customization",
    description:
      "Upload an avatar, write your bio, and claim a unique username for a shareable URL.",
    spotlight: "rgba(59, 130, 246, 0.18)" as const,
    featured: false,
  },
  {
    icon: GripVertical,
    title: "Drag & drop editor",
    description:
      "Reorder links and socials visually. Changes go live instantly on your public profile.",
    spotlight: "rgba(251, 146, 60, 0.18)" as const,
    featured: false,
  },
  {
    icon: Smartphone,
    title: "Mobile-first design",
    description:
      "Every profile is optimized for phones first—fast loads, clean layout, and thumb-friendly taps.",
    spotlight: "rgba(34, 197, 94, 0.16)" as const,
    featured: false,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative w-full py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/3 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <BlurFade inView delay={0.1}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Features
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Everything you need in one link
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              Unilink gives creators a polished bio page with the tools to grow,
              measure, and share all without writing code.
            </p>
          </div>
        </BlurFade>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <BlurFade
              key={feature.title}
              inView
              delay={0.05 * i}
              className="h-full"
            >
              <SpotlightCard
                className={cn(
                  "h-full",
                  feature.featured && "ring-1 ring-primary/20",
                )}
                spotlightColor={feature.spotlight}
              >
                {feature.featured && (
                  <BorderBeam
                    size={120}
                    duration={8}
                    colorFrom="oklch(0.546 0.245 262.881)"
                    colorTo="oklch(0.673 0.182 276.935)"
                    borderWidth={1.5}
                  />
                )}
                <div className="relative z-10 flex h-full flex-col gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
