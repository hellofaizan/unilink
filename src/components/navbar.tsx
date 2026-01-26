import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { LucideInfo } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between p-6">
      <div className="flex items-center gap-1">
        <Image
          src={"/logos/logo_white.png"}
          alt="Unilink"
          height={40}
          width={40}
        />
        <p className="font-medium text-2xl">UNILINK</p>
      </div>

      <div className="flex items-center gap-4">
        <p className="cursor-pointer hover:underline hover:text-primary">
          pricing
        </p>
        <p className="flex items-center gap-0.5 cursor-pointer hover:underline hover:text-primary">
          <LucideInfo size={14} />
          help
        </p>
        <Link href={"https://dub.sh/unilinkdc"} target="_blank">
          <p className="cursor-pointer hover:underline hover:text-primary">
            discord
          </p>
        </Link>
        <Link href={"/register"}>
          <Button
            size={"lg"}
            variant={"gradient"}
          >
            GET STARTED
          </Button>
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
}
