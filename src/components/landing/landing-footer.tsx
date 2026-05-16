"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Analytics", href: "/#analytics" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Help", href: "/help" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  Community: [
    { label: "Discord", href: "https://dub.sh/unilinkdc", external: true },
  ],
};

export function LandingFooter() {
  return (
    <footer className="relative mt-8 w-full border-t border-border/60 bg-muted/20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-16">
        <BlurFade inView>
          <div className="grid gap-10 md:grid-cols-[1.4fr_2fr]">
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center gap-2">
                <Image
                  src="/logos/logo_blue.png"
                  alt="Unilink"
                  width={40}
                  height={40}
                  unoptimized
                />
                <span className="text-xl font-bold tracking-tight">Unilink</span>
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                Your rich, modern link in bio. Share everything you create in
                one beautiful place.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {Object.entries(footerLinks).map(([group, links]) => (
                <div key={group}>
                  <p className="text-sm font-semibold text-foreground">{group}</p>
                  <ul className="mt-4 space-y-3">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          target={"external" in link && link.external ? "_blank" : undefined}
                          rel={
                            "external" in link && link.external
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Unilink. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              Designed by <Link href="https://mohammadfaizan.com" target="_blank" className="text-primary hover:underline">Mohammad Faizaan</Link>
            </p>
          </div>
        </BlurFade>
      </div>
    </footer>
  );
}
