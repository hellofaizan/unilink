"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import Image from "next/image";
import Link from "next/link";

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
    <footer className="relative w-full border-t border-zinc-800 bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-14">
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
                <span className="text-xl font-bold tracking-tight text-white">
                  Unilink
                </span>
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
                Your rich, modern link in bio. Share everything you create in
                one beautiful place.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {Object.entries(footerLinks).map(([group, links]) => (
                <div key={group}>
                  <p className="text-sm font-semibold text-white">{group}</p>
                  <ul className="mt-4 space-y-3">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          target={
                            "external" in link && link.external
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            "external" in link && link.external
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="text-sm text-zinc-500 transition-colors hover:text-white"
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

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 sm:flex-row">
            <p className="text-xs text-zinc-600">
              © {new Date().getFullYear()} Unilink. All rights reserved.
            </p>
            <p className="text-xs text-zinc-600">
              Designed by{" "}
              <Link
                href="https://mohammadfaizan.com"
                target="_blank"
                className="text-zinc-400 hover:text-white hover:underline"
              >
                Mohammad Faizaan
              </Link>
            </p>
          </div>
        </BlurFade>
      </div>
    </footer>
  );
}
