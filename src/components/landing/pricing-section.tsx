"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Star } from "lucide-react";
import Link from "next/link";

const basicFeatures = [
  "Unlimited links",
  "40+ social media",
  "Profile customization",
  "Basic theme templates",
  "Link articles",
  "Basic analytics",
];

const premiumFeatures = [
  { text: "Everything in Basic", highlight: false },
  { text: "Animated avatar", highlight: false },
  { text: "Collect emails", highlight: false },
  { text: "Embed Spotify links", highlight: false },
  { text: "Profile layouts", highlight: false },
  { text: "Better SEO", highlight: false },
  { text: "Advanced customization", highlight: false },
  { text: "Detailed analytics", highlight: true },
  { text: "Custom domain", highlight: true },
  { text: "Hide Unilink branding", highlight: true },
];

export function PricingSection() {
  return (
    <section id="pricing" className="w-full py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <BlurFade inView>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Pricing
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Simple plans, start for free
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Get started for{" "}
              <span className="inline-flex rounded-lg bg-primary px-3 py-0.5 font-semibold text-primary-foreground">
                FREE
              </span>
               {" "} upgrade when you need more power.
            </p>
          </div>
        </BlurFade>

        <div className="mt-14 overflow-visible flex flex-col items-center justify-center gap-6 md:flex-row md:items-end">
          <BlurFade inView delay={0.05} className="w-full max-w-sm">
            <div className="rounded-2xl border border-border/60 bg-card px-8 py-10 shadow-sm">
              <p className="text-3xl font-semibold">Basic</p>
              <p className="mt-1 text-3xl font-semibold">
                $0
                <span className="text-sm font-normal text-muted-foreground">
                  /lifetime
                </span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                No credit card required
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
                {basicFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-7 w-full rounded-lg">
                <Link href="/register">Get started</Link>
              </Button>
            </div>
          </BlurFade>

          <BlurFade inView delay={0.1} className="w-full max-w-sm">
            <div
              className={cn(
                "relative overflow-visible rounded-2xl border border-primary bg-card px-8 py-10 shadow-md md:-translate-y-2",
              )}
            >
              <BorderBeam
                size={140}
                duration={8}
                colorFrom="oklch(0.546 0.245 262.881)"
                colorTo="oklch(0.673 0.182 276.935)"
                borderWidth={1.5}
              />
              <span className="absolute -top-3.5 right-3.5 rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                Most popular
              </span>
              <p className="pt-2 text-3xl font-semibold">Premium</p>
              <p className="mt-1 text-3xl font-semibold">
                $5.99
                <span className="text-sm font-normal text-muted-foreground">
                  /lifetime
                </span>
              </p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {premiumFeatures.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-2">
                    {feature.highlight ? (
                      <Star className="h-4 w-4 shrink-0 text-[#FFD700]" />
                    ) : (
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                    )}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                variant="gradient"
                className="mt-7 w-full rounded-lg"
              >
                <Link href="/register">Get started</Link>
              </Button>
            </div>
          </BlurFade>
        </div>

        <BlurFade inView delay={0.15}>
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Premium checkout is coming soon — you can explore all features on
            the free plan today.
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
