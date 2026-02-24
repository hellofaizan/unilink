"use client";

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

export default function LandingPage() {
  return (
    <main className="flex flex-col md:px-8 px-2 max-w-7xl w-full overflow-hidden">
      <div className="flex flex-col items-center md:h-screen w-full">
        <div className="flex items-center md:px-3 justify-between py-4 md:py-6 md:mt-4 w-full">
          <div className="w-15 h-15 flex items-center gap-1">
            <Image
              src={"/logos/logo_blue.png"}
              alt="Unilink"
              className="w-12 md:w-14"
              height={0}
              width={0}
              priority
              unoptimized
            />
          </div>

          <div className="flex items-center gap-4">
            <Link href={"/pricing"} className="hidden md:flex">
              <p className="hidden text-lg md:flex cursor-pointer hover:underline hover:text-primary">
                pricing
              </p>
            </Link>
            <Link href={"/help"} target="_blank" className="hidden md:flex">
              <p className="hidden text-lg md:flex items-center gap-0.5 cursor-pointer hover:underline hover:text-primary">
                help
              </p>
            </Link>
            <Link
              href={"https://dub.sh/unilinkdc"}
              target="_blank"
              className="hidden text-lg md:flex"
            >
              <p className="cursor-pointer hover:underline hover:text-primary">
                discord
              </p>
            </Link>

            <CTAButton />
          </div>
        </div>

        <section className="flex w-full flex-col items-center pb-15 pt-15 md:flex-row md:items-start lg:pt-10 px-1">
          <div className="flex flex-2 flex-col justify-center md:mt-12 md:ml-4 text-start">
            <h1
              className={cn(
                "text-5xl md:text-7xl font-extrabold tracking-wide",
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

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Build a beautiful, mobile-optimized link in bio page in minutes.
              Your personal page to show everything you are, create and sell in
              one place..
            </p>

            <div className="mt-8 flex flex-col md:items-center gap-4 sm:flex-row sm:items-center">
              <Link
                href={"/login"}
                className="cursor-pointer flex w-full max-w-xs items-center justify-center gap-3 rounded-full bg-slate-900 px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(15,23,42,0.45)] transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full">
                  <img src={"/socials/google.svg"} />
                </span>
                <span className="text-base">Sign up with Google</span>
              </Link>

              <div className="hidden md:flex">
                <PHBadge />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 md:justify-start">
              <span>No credit card required</span>
              <span className="hidden h-4 w-px bg-slate-200 sm:inline-block" />
              <span>
                Powered by{" "}
                <span className="bg-linear-to-r from-sky-500 to-indigo-500 bg-clip-text font-semibold text-transparent">
                  AI
                </span>
              </span>
            </div>
          </div>

          <div className="flex-1 flex w-full justify-center md:w-auto mt-8 transition-all">
            <img
              src={"/previewbanner.svg"}
              className="w-60 md:w-86 md:absolute drop-shadow-xl"
            />
            <img
              src={"/cards/bmac.png"}
              className="w-30 bottom-20 hidden md:flex ml-50 absolute drop-shadow-xl -rotate-8"
            />
            <div className="md:flex relative w-full h-full hidden">
              <img
                src={"/cards/twitter.png"}
                className="w-30 left-0 md:absolute drop-shadow-xl -rotate-4 -ml-10"
              />
              <img
                src={"/cards/youtube.png"}
                className="w-30 left-0 absolute drop-shadow-xl mt-35 -ml-15 rotate-3"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
