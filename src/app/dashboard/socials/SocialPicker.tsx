"use client";

import { Globe } from "lucide-react";
import { SOCIAL_PLATFORMS } from "./components/social-data";
import { AddSocialModal } from "./components/addSocialModel";
import { SocialIcon } from "./components/SocialIcon";

export function SocialPicker() {
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {SOCIAL_PLATFORMS.map((social, index) => (
          <div key={index}>
            <AddSocialModal social={social}>
              <SocialIcon social={social} />
            </AddSocialModal>
          </div>
        ))}

        <AddSocialModal
          social={{
            id: "custom",
            name: "Custom URL",
            icon: "globe",
            baseUrl: "https://",
            isCustom: true,
          }}
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
      </div>
    </div>
  );
}
