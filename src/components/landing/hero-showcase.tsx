"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { ShineBorder } from "@/components/ui/shine-border";
import Image from "next/image";
import { useEffect, useState } from "react";

/** Add your screenshot at public/landing/dashboard-screenshot.png */
export const LANDING_SCREENSHOT = "/landing/dashboard-preview.png";
const FALLBACK_SCREENSHOT = "/previewbanner.svg";

export function HeroShowcase() {
  const [src, setSrc] = useState(FALLBACK_SCREENSHOT);

  useEffect(() => {
    const probe = new window.Image();
    probe.onload = () => setSrc(LANDING_SCREENSHOT);
    probe.onerror = () => setSrc(FALLBACK_SCREENSHOT);
    probe.src = LANDING_SCREENSHOT;
  }, []);

  return (
    <section className="w-full pb-8 pt-2 md:pb-14 md:pt-4">
      <div className="mx-auto max-w-6xl px-2 md:px-4">
        <BlurFade inView delay={0.1}>
          {" "}
          <div className="mb-6 text-center md:mb-8">
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
              Your link in bio, beautifully built
            </h2>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-2 shadow-[0_24px_80px_rgba(15,23,42,0.12)] md:rounded-3xl md:p-3 dark:shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <ShineBorder
              shineColor={[
                "oklch(0.546 0.245 262.881 / 0.35)",
                "oklch(0.673 0.182 276.935 / 0.25)",
                "oklch(0.852 0.199 91.936 / 0.2)",
              ]}
              borderWidth={1}
              duration={12}
            />
            <div className="relative overflow-hidden rounded-xl bg-muted/30 md:rounded-2xl">
              <div className="flex items-center gap-2 border-b border-border/50 bg-card/80 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
                <span className="ml-3 flex-1 rounded-md bg-muted px-3 py-1 text-center text-xs text-muted-foreground">
                  unilink.app/dashboard
                </span>
              </div>{" "}
              <div className="relative aspect-16/10 w-full">
                <Image
                  src={src}
                  alt="Unilink dashboard preview"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 1152px"
                  priority
                  unoptimized={src === FALLBACK_SCREENSHOT}
                  onError={() => setSrc(FALLBACK_SCREENSHOT)}
                />
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
