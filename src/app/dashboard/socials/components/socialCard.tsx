import React from "react";
import { Globe, GripVertical, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SocialCardViewModel } from "../types/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SocialPlatform } from "./social-data";
import { getPlatformMeta } from "../types/mapper";
import { AddSocialModal } from "./addSocialModel";

type SocialCardProps = SocialCardViewModel & {
  originalType?: string;
  originalHandle?: string;
  originalUrl?: string;

  onDelete?: (id: string) => void;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
  className?: string;

  onSaved?: (payload: { type: string; handle?: string; url?: string }) => void;
};

export function SocialCard({
  id,
  platformName,
  icon,
  href,
  displayUrl,
  isCustom,
  originalType,
  originalHandle,
  originalUrl,
  onDelete,
  dragHandleProps,
  className,
  onSaved,
}: SocialCardProps) {
  const handleDelete = () => onDelete?.(id);

  const showGlobeIcon = isCustom || icon === "globe";

  let platform: SocialPlatform | undefined = originalType
    ? getPlatformMeta(originalType)
    : undefined;

  if (!platform && originalType === "custom") {
    platform = {
      id: "custom",
      name: "Custom URL",
      icon: "globe",
      baseUrl: "",
      isCustom: true,
    };
  }

  return (
    <div
      className={cn(
        "rounded-2xl flex flex-row gap-1 pl-1 border items-center bg-muted/20",
        className,
      )}
    >
      <Button
        type="button"
        variant={"ghost"}
        size={"icon-xs"}
        className="cursor-grab"
        aria-label="Reorder"
        {...dragHandleProps}
      >
        <GripVertical />
      </Button>
      <div className="flex flex-col w-full gap-2 border-l rounded-2xl px-4 py-2.5 bg-muted/50">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="text-sm text-foreground font-medium">
            {platformName}
          </span>

          <div className="flex items-center gap-1.5">
            {platform && (
              <AddSocialModal
                social={platform}
                mode="edit"
                initialHandle={originalHandle}
                initialUrl={originalUrl}
                socialId={id}
                onSaved={onSaved}
              >
                <Button
                  variant={"ghost"}
                  type="button"
                  className="h-6 w-6 inline-flex items-center justify-center rounded-md transition"
                  aria-label="Edit link"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              </AddSocialModal>
            )}

            <Button
              variant={"ghost"}
              type="button"
              onClick={handleDelete}
              className="h-6 w-6 inline-flex items-center justify-center rounded-md hover:bg-red-950/60 text-red-500 hover:text-red-400 transition"
              aria-label="Delete link"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div className="rounded-lg px-2 py-1 flex items-center gap-2 border bg-muted">
          <div className="h-7 w-7 rounded-full flex items-center justify-center overflow-hidden">
            {showGlobeIcon ? (
              <Globe className="h-4 w-4" />
            ) : (
              <Image
                src={icon}
                alt={platformName}
                width={20}
                height={20}
                className="object-contain"
              />
            )}
          </div>

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md hover:underline truncate"
          >
            {displayUrl}
          </a>
        </div>
      </div>
    </div>
  );
}
