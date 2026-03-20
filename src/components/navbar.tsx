"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { LucideInfo } from "lucide-react";
import { useTheme } from "next-themes";
import CTAButton from "./cta-button";
import { Gugi } from "next/font/google";
import { cn } from "@/lib/utils";

const gugi = Gugi({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export default function Navbar() {
  return (
    <div className="w-full fixed flex items-center max-w-6xl justify-between py-4 md:p-6">
      <div className="flex items-center gap-1">
        <Image
          src={"/logos/banner.svg"}
          alt="Unilink"
          className="w-50 h-auto object-contain"
          height={0}
          width={0}
          priority
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
            {/* <LucideInfo size={14} /> */}
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
        {/* <div className="hidden md:flex">
          <ModeToggle />
        </div> */}

        <CTAButton />
      </div>
    </div>
  );
}
