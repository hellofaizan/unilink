"use client";

import Aurora from "@/components/Aurora";
import GradientText from "@/components/GradientText";
import CTAButton from "@/components/cta-button";
import PHBadge from "@/components/phbadge";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { PT_Serif } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const ptSerif = PT_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export function LandingHero() {
  return (
    <section className="relative w-full overflow-hidden px-4 pb-4 pt-6 md:px-8 md:pb-8 md:pt-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Aurora
          colorStops={["#6366f1", "#a855f7", "#f97316"]}
          amplitude={0.9}
          blend={0.45}
          speed={0.35}
        />
        <DotPattern
          width={20}
          height={20}
          cr={1}
          className="text-primary/15 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/40 via-background/80 to-background" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Free forever · No credit card
        </motion.p>

        <h1
          className={cn(
            "text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl",
            ptSerif.className,
          )}
        >
          <span className="block text-primary">Rich</span>
          <span className="block">
            <GradientText
              colors={["#6366f1", "#c084fc", "#fb923c", "#6366f1"]}
              animationSpeed={6}
              className="inline"
            >
              Modern
            </GradientText>
          </span>
          <span className="block bg-linear-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
            Link in Bio
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Build a beautiful, mobile-optimized link in bio page in minutes. Share
          everything you create and sell—in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-10 flex w-full max-w-xl flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center"
        >
          <CTAButton />
          <Link
            href="/login"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-card/90 px-6 text-sm font-medium shadow-sm backdrop-blur-sm transition hover:bg-accent"
          >
            <Image src="/socials/google.svg" alt="" width={18} height={18} />
            Sign in with Google
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-6 hidden md:block"
        >
          <PHBadge />
        </motion.div>
      </motion.div>
    </section>
  );
}
