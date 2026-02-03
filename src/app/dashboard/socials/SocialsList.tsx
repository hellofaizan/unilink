"use client";

import React from "react";
import { SocialPlatform } from "./components/social-data";
import { SocialLinkProps } from "./types/types";
import { SocialCard } from "./components/socialCard";
import { mapLinksToCards } from "./types/mapper";

type SocialListProps = {
  socials: SocialLinkProps[];
  onEditSocial?: (id: string) => void;
  onDeleteSocial?: (id: string) => void;
};

export function SocialList({
  socials,
  onEditSocial,
  onDeleteSocial,
}: SocialListProps) {
  const cards = mapLinksToCards(socials);

  if (cards.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        You haven&apos;t added any social links yet.
      </p>
    );
  }
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      {cards.map((card) => {
        const original = socials.find((s) => s.id === card.id);
        return (
          <SocialCard
            key={card.id}
            {...card}
            originalType={original?.type}
            originalHandle={original?.handle}
            originalUrl={original?.url}
            onDelete={onDeleteSocial}
          />
        );
      })}
    </div>
  );
}
