"use client";

import { Globe } from "lucide-react";
import { SOCIAL_PLATFORMS } from "./components/social-data";
import { AddSocialModal } from "./components/addSocialModel";
import { SocialIcon } from "./components/SocialIcon";

type SocialPickerProps = {
  // Types (ids) of socials that are already saved for this user.
  // These will be hidden from the picker so the user can't add duplicates.
  existingSocialTypes?: string[];
  // Called after a social is successfully added or edited from the picker.
  onSocialSaved?: (payload: { type: string; handle?: string; url?: string }) => void;
};

export function SocialPicker({
  existingSocialTypes = [],
  onSocialSaved,
}: SocialPickerProps) {
  const usedTypes = new Set(existingSocialTypes);

  // Only show platforms the user hasn't already added.
  const availablePlatforms = SOCIAL_PLATFORMS.filter(
    (platform) => !usedTypes.has(platform.id),
  );

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {availablePlatforms.map((social, index) => (
          <div key={index}>
            <AddSocialModal social={social} onSaved={onSocialSaved}>
              <SocialIcon social={social} />
            </AddSocialModal>
          </div>
        ))}

        {/* Hide the custom URL icon once a "custom" social already exists */}
        {!usedTypes.has("custom") && (
        <AddSocialModal
          social={{
            id: "custom",
            name: "Custom URL",
            icon: "globe",
            baseUrl: "https://",
            isCustom: true,
          }}
            onSaved={onSocialSaved}
        >
          <div className="w-full md:w-auto px-4 py-3 rounded-2xl bg-muted/30 hover:bg-muted/70 border flex items-center gap-3 transition cursor-pointer">
            <Globe className="h-8 w-8 text-foreground shrink-0" />
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">Add Custom URL</span>
              <span className="text-xs text-muted-foreground">
                Use your own URL.
              </span>
            </div>
          </div>
        </AddSocialModal>
        )}
      </div>
    </div>
  );
}
