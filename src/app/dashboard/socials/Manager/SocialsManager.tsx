"use client";

import { useState, useTransition } from "react";
import { DeleteSocial } from "@/action/add-social";
import { SocialPicker } from "../SocialPicker";
import { SocialList } from "../SocialsList";
import type { SocialLinkProps } from "../types/types";
import { toast } from "sonner";

type Props = {
  initialSocials: SocialLinkProps[];
};

export function SocialsManager({ initialSocials }: Props) {
  const [socials, setSocials] = useState<SocialLinkProps[]>(initialSocials);
  const [, startTransition] = useTransition();

  const handleUpsertSocial = (payload: {
    type: string;
    handle?: string;
    url?: string;
  }) => {
    setSocials((prev) => {
      const existing = prev.find((s) => s.type === payload.type);

      if (existing) {
        return prev.map((s) =>
          s.type === payload.type
            ? {
                ...s,
                handle:
                  payload.handle !== undefined
                    ? payload.handle
                    : (existing.handle ?? null),
                url:
                  payload.url !== undefined
                    ? payload.url
                    : (existing.url ?? null),
              }
            : s,
        );
      }

      return [
        ...prev,
        {
          id: `${payload.type}-${Date.now()}`,
          type: payload.type,
          handle: payload.handle ?? null,
          url: payload.url ?? null,
        },
      ];
    });
  };

  const handleDeleteSocial = (id: string) => {
    setSocials((prev) => prev.filter((s) => s.id !== id));

    startTransition(async () => {
      const result = await DeleteSocial(id);

      if (result.success) {
        toast.success("Deleted the social link successfully!", {
          position: "top-center",
        });
      } else {
        toast.error(`Failed to social link`, {
          position: "top-center",
        });
      }
    });
  };

  const existingTypes = socials.map((s) => s.type);

  return (
    <div className="flex flex-col gap-8">
      <SocialPicker
        existingSocialTypes={existingTypes}
        onSocialSaved={handleUpsertSocial}
      />

      <SocialList
        socials={socials}
        onDeleteSocial={handleDeleteSocial}
        onUpsertSocial={handleUpsertSocial}
      />
    </div>
  );
}
