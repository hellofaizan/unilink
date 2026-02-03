import Image from "next/image";
import { cn } from "@/lib/utils";
import { SocialPlatform } from "./social-data";
import { Globe } from "lucide-react";

interface SocialIconProps {
  social: SocialPlatform;
  className?: string;
}

export function SocialIcon({
  social,
  className,
  ...props
}: SocialIconProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "h-16 w-16 rounded-3xl bg-muted/30 hover:bg-muted/70 border flex items-center justify-center transition cursor-pointer",
        className,
      )}
      title={social.name}
      {...props}
    >
      {social.isCustom ? (
        <Globe className="h-8 w-8 text-foreground" />
      ) : (
        <img src={social.icon} alt={social.name} width={30} height={30} className="w-9 h-9" />
      )}
    </div>
  );
}
