"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { LucideInfo } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme } = useTheme();
  return (
    <div className="fixed w-full flex items-center justify-between p-3 md:p-6">
      <div className="flex items-center gap-1">
        <Image
          src={
            theme === "light"
              ? "/logos/logo_black.png"
              : "/logos/logo_white.png"
          }
          alt="Unilink"
          height={40}
          width={40}
          priority
          unoptimized
        />
        <p className="font-medium text-2xl">UNILINK</p>
      </div>

      <div className="flex items-center gap-4">
        <p className="hidden md:flex cursor-pointer hover:underline hover:text-primary">
          pricing
        </p>
        <p className="hidden md:flex items-center gap-0.5 cursor-pointer hover:underline hover:text-primary">
          <LucideInfo size={14} />
          help
        </p>
        <Link
          href={"https://dub.sh/unilinkdc"}
          target="_blank"
          className="hidden md:flex"
        >
          <p className="cursor-pointer hover:underline hover:text-primary">
            discord
          </p>
        </Link>
        <Link href={"/register"}>
          <Button size={"lg"} variant={"gradient"}>
            GET STARTED
          </Button>
        </Link>
        <div className="hidden md:flex">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
