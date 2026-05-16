"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";
import { PT_Serif } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useCallback, useEffect, useState } from "react";

const ptSerif = PT_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const USERNAME_PATTERN = /^[a-z0-9-]{1,20}$/;

export function CtaBanner() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);

  const normalized = username.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 20);

  const checkAvailability = useCallback(async (value: string) => {
    if (!value || !USERNAME_PATTERN.test(value)) {
      setAvailable(null);
      return;
    }
    setChecking(true);
    try {
      const res = await fetch(
        `/api/checkusername?username=${encodeURIComponent(value)}`,
      );
      const data = (await res.json()) as { available: boolean };
      setAvailable(data.available);
    } catch {
      setAvailable(null);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void checkAvailability(normalized);
    }, 400);
    return () => clearTimeout(timer);
  }, [normalized, checkAvailability]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (normalized && USERNAME_PATTERN.test(normalized)) {
      router.push(`/register?username=${encodeURIComponent(normalized)}`);
    } else {
      router.push("/register");
    }
  };

  return (
    <section className="relative w-full bg-zinc-950 text-white">
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 -translate-y-[calc(100%-1px)] text-background"
      >
        <svg
          viewBox="0 0 1440 80"
          fill="currentColor"
          preserveAspectRatio="none"
          className="block h-12 w-full md:h-16"
        >
          <path d="M0,80 C480,0 960,0 1440,80 Z" />
        </svg>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[120px]" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-purple-600/20 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 pb-20 pt-16 md:px-8 md:pb-28 md:pt-20">
        <BlurFade inView>
          <div className="text-center">
            <h2
              className={cn(
                "text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl",
                ptSerif.className,
              )}
            >
              Your link in bio,{" "}
              <span className="text-primary-foreground/90 italic text-primary">
                supercharged
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-zinc-400 md:text-lg">
              Join creators who share smarter. Claim your username and go live
              in minutes.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-10 max-w-xl"
            >
              <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-2 pl-3 pr-2 shadow-2xl backdrop-blur-sm transition focus-within:border-primary/60">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary">
                  <Image
                    src="/logos/logo_blue.png"
                    alt=""
                    width={28}
                    height={28}
                    className="brightness-0 invert"
                    unoptimized
                  />
                </div>
                <span className="shrink-0 text-sm font-medium text-zinc-400 sm:text-base">
                  unilink.app/
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  autoComplete="off"
                  spellCheck={false}
                  className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-zinc-600"
                  aria-label="Choose your username"
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-zinc-900 transition hover:bg-zinc-200"
                  aria-label="Claim username"
                >
                  {checking ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </button>
              </div>

              {normalized && available === true && (
                <p className="mt-2 text-xs font-medium text-emerald-400">
                  @{normalized} is available
                </p>
              )}
              {normalized && available === false && (
                <p className="mt-2 text-xs font-medium text-red-400">
                  @{normalized} is taken — try another
                </p>
              )}
            </form>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-full bg-white px-8 text-zinc-900 hover:bg-zinc-100"
              >
                <Link href="/register">Get started free</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 rounded-full border-zinc-600 bg-transparent px-8 text-white hover:bg-zinc-800"
              >
                <Link href="/#pricing">View pricing</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
              <Link href="/#features" className="hover:text-zinc-300">
                Features
              </Link>
              <Link href="/#analytics" className="hover:text-zinc-300">
                Analytics
              </Link>
              <Link href="/help" className="hover:text-zinc-300">
                Help
              </Link>
              <Link
                href="https://dub.sh/unilinkdc"
                target="_blank"
                className="hover:text-zinc-300"
              >
                Discord
              </Link>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
