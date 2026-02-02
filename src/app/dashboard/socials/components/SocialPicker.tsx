"use client";

import { useState } from "react";
import { SOCIAL_PLATFORMS } from "./social-data";
import { SocialIcon } from "./SocialIcon";
import { AddSocialModal } from "./addSocialModel";

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
      </div>
    </div>
  );
}
