"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";
import { PT_Serif } from "next/font/google";
import Image from "next/image";
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
    <section className="w-full px-4 pb-20 md:px-8 md:pb-28">
      <div className="mx-auto max-w-3xl">
        <BlurFade inView>
          <div className="text-center">
            <h2
              className={cn(
                "text-3xl leading-tight tracking-tight md:text-4xl lg:text-[2.75rem]",
                ptSerif.className,
              )}
            >
              Join a growing community of the most{" "}
              <em className="font-normal italic text-primary">incredible</em>{" "}
              creators!
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-10 max-w-xl"
            >
              <div className="flex items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-2 pl-3 pr-2 shadow-[0_8px_32px_rgba(15,23,42,0.08)] transition-shadow focus-within:border-primary/40 focus-within:shadow-[0_12px_40px_rgba(99,102,241,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-primary-foreground">
                  <Image src="/logos/logo_blue.png" alt="Unilink" width={30} height={30} />
                </div>

                <span className="shrink-0 text-sm font-medium text-muted-foreground sm:text-base">
                  unilink.app/
                </span>

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  autoComplete="off"
                  spellCheck={false}
                  className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/60"
                  aria-label="Choose your username"
                />

                <button
                  type="submit"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted-foreground text-primary-foreground transition-colors hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
                <p className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  @{normalized} is available
                </p>
              )}
              {normalized && available === false && (
                <p className="mt-2 text-xs font-medium text-destructive">
                  @{normalized} is taken — try another
                </p>
              )}
            </form>

            <p className="mt-5 text-sm text-muted-foreground">
              Claim your username before it&apos;s too late!
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
