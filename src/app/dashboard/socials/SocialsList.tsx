"use client";

import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { SocialLinkProps } from "./types/types";
import { SocialCard } from "./components/socialCard";
import { mapLinksToCards } from "./types/mapper";

type SocialListProps = {
  socials: SocialLinkProps[];
  onUpsertSocial?: (payload: {
    type: string;
    handle?: string;
    url?: string;
  }) => void;
  onDeleteSocial?: (id: string) => void;
  onReorder?: (orderedIds: string[]) => void;
};

export function SocialList({
  socials,
  onUpsertSocial,
  onDeleteSocial,
  onReorder,
}: SocialListProps) {
  const cards = mapLinksToCards(socials);

  if (cards.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        You haven&apos;t added any social links yet.
      </p>
    );
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const ids = cards.map((c) => c.id);
    const oldIndex = ids.indexOf(active.id as string);
    const newIndex = ids.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;

    const newOrderIds = arrayMove(ids, oldIndex, newIndex);
    onReorder?.(newOrderIds);
  };

  const cardIds = cards.map((card) => card.id);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
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
      </SortableContext>
    </DndContext>
  );
}
