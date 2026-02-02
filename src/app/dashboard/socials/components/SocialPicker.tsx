"use client";

import { useState } from "react";
import { SOCIAL_PLATFORMS } from "./social-data";
import { SocialIcon } from "./SocialIcon";
import { AddSocialModal } from "./addSocialModel";

export function SocialPicker() {
  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {SOCIAL_PLATFORMS.map((social) => (
          <AddSocialModal key={social.id} social={social}>
            <SocialIcon social={social} />
          </AddSocialModal>
        ))}
      </div>
    </div>
  );
}
