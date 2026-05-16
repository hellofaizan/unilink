"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { ShineBorder } from "@/components/ui/shine-border";
import { cn } from "@/lib/utils";
import { MousePointerClick, Rocket, UserPlus } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create your account",
    description:
      "Sign up with Google or email in seconds. Pick a username and you're ready to build.",
  },
  {
    step: "02",
    icon: MousePointerClick,
    title: "Add links & socials",
    description:
      "Drop in your links, connect social profiles, and arrange everything with drag-and-drop.",
  },
  {
    step: "03",
    icon: Rocket,
    title: "Share your page",
    description:
      "Publish at your custom URL and track visits and clicks from your analytics dashboard.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <BlurFade inView>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Live in three simple steps
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              From signup to shareable bio page, no designers or developers
              required.
            </p>
          </div>
        </BlurFade>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((item, i) => (
            <BlurFade key={item.step} inView delay={0.1 * i}>
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8",
                  i === 1 && "md:-translate-y-2",
                )}
              >
                {i === 1 && (
                  <ShineBorder
                    shineColor={[
                      "oklch(0.546 0.245 262.881 / 0.4)",
                      "oklch(0.673 0.182 276.935 / 0.3)",
                      "oklch(0.852 0.199 91.936 / 0.25)",
                    ]}
                    borderWidth={1}
                    duration={10}
                  />
                )}
                <span className="text-5xl font-bold text-primary/15">
                  {item.step}
                </span>
                <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
