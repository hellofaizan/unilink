"use client";

import { AnalyticsShowcase } from "@/components/landing/analytics-showcase";
import { BentoGridSection } from "@/components/landing/bento-grid-section";
import { CtaBanner } from "@/components/landing/cta-banner";
import { FaqSection } from "@/components/landing/faq-section";
import { HeroShowcase } from "@/components/landing/hero-showcase";
import { HowItWorksSection } from "@/components/landing/how-it-works";
import { LandingFooter } from "@/components/landing/landing-footer";
import { MarqueeSection } from "@/components/landing/marquee-section";
import { PricingSection } from "@/components/landing/pricing-section";
import CTAButton from "@/components/cta-button";
import PHBadge from "@/components/phbadge";
import { cn } from "@/lib/utils";
import { PT_Serif } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const ptSerif = PT_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function LandingPageClient() {
  return (
    <main className="flex w-full flex-col overflow-x-hidden">
      <div className="relative flex w-full flex-col">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-32 top-20 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -right-20 top-40 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <header className="flex w-full items-center justify-between py-4 md:px-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/logos/logo_blue.png"
              alt="Unilink"
              className="w-12 md:w-14"
              height={56}
              width={56}
              priority
              unoptimized
            />
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/#pricing"
              className="hidden text-lg hover:text-primary hover:underline md:block"
            >
              pricing
            </Link>
            <Link
              href="/help"
              target="_blank"
              className="hidden text-lg hover:text-primary hover:underline md:block"
            >
              help
            </Link>
            <Link
              href="https://dub.sh/unilinkdc"
              target="_blank"
              className="hidden text-lg hover:text-primary hover:underline md:block"
            >
              discord
            </Link>
            <CTAButton />
          </nav>
        </header>

        <section className="flex w-full flex-col items-center px-1 pb-10 pt-10 text-center md:pb-14 md:pt-12 lg:pt-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center md:mt-6">
            <h1
              className={cn(
                "animate-in fade-in slide-in-from-bottom-4 fill-mode-both text-5xl font-extrabold tracking-wide duration-700 md:text-7xl",
                ptSerif.className,
              )}
            >
              <span className="block text-primary">Rich</span>
              <span className="block bg-linear-to-r from-orange-400 via-amber-400 to-rose-400 bg-clip-text text-transparent">
                Modern
              </span>
              <span className="block bg-linear-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                Link in Bio
              </span>
            </h1>

            <p className="mt-6 max-w-xl animate-in fade-in slide-in-from-bottom-4 fill-mode-both text-sm leading-relaxed text-slate-600 delay-150 duration-700 sm:text-base dark:text-muted-foreground">
              Build a beautiful, mobile-optimized link in bio page in minutes.
              Your personal page to show everything you are, create and sell in
              one place.
            </p>

            <div className="mt-8 flex animate-in fade-in slide-in-from-bottom-4 fill-mode-both flex-col items-center gap-4 delay-300 duration-700 sm:flex-row sm:justify-center">
              <Link
                href="/login"
                className="flex w-full max-w-xs cursor-pointer items-center justify-center gap-3 rounded-full bg-slate-900 px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(15,23,42,0.45)] transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto dark:bg-primary dark:shadow-primary/25 dark:hover:bg-primary/90"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full">
                  <Image
                    src="/socials/google.svg"
                    alt=""
                    width={28}
                    height={28}
                  />
                </span>
                <span className="text-base">Sign up with Google</span>
              </Link>

              <div className="hidden md:flex">
                <PHBadge />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-muted-foreground">
              <span>No credit card required</span>
              <span className="hidden h-4 w-px bg-slate-200 sm:inline-block dark:bg-border" />
              <span>
                Powered by{" "}
                <span className="bg-linear-to-r from-sky-500 to-indigo-500 bg-clip-text font-semibold text-transparent">
                  AI
                </span>
              </span>
            </div>
          </div>
        </section>
      </div>

      <HeroShowcase />
      <MarqueeSection />
      <BentoGridSection />
      <AnalyticsShowcase />
      <HowItWorksSection />
      <PricingSection />
      <FaqSection />
      <CtaBanner />
      <LandingFooter />
    </main>
  );
}
