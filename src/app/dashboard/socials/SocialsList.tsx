"use client";

import React from "react";
import { SocialLinkProps } from "./types/types";
import { SocialCard } from "./components/socialCard";
import { mapLinksToCards } from "./types/mapper";

type SocialListProps = {
  // Raw socials coming from the current state (loaded once from the server).
  socials: SocialLinkProps[];
  // Called when a social is added or edited so the parent can update state.
  onUpsertSocial?: (payload: {
    type: string;
    handle?: string;
    url?: string;
  }) => void;
  // Called when the user clicks delete on a card.
  onDeleteSocial?: (id: string) => void;
};

export function SocialList({
  socials,
  onUpsertSocial,
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
            originalHandle={original?.handle ?? undefined}
            originalUrl={original?.url ?? undefined}
            onDelete={onDeleteSocial}
            onSaved={onUpsertSocial}
          />
        );
      })}
    </div>
  );
}
