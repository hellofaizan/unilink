"use client";

import { useState, useTransition } from "react";
import type { Link } from "@prisma/client";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreateLink, ReorderLinks, DeleteLink } from "@/action/links";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  GripVertical,
  LinkIcon,
  Loader2,
  Mouse,
  MousePointer2,
  Trash2,
} from "lucide-react";

const NewLinkSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  url: z.string().url("Please enter a valid URL (include https://)"),
});

type NewLinkValues = z.infer<typeof NewLinkSchema>;

type LinksManagerProps = {
  initialLinks: Link[];
};

export default function LinksManager({ initialLinks }: LinksManagerProps) {
  const [links, setLinks] = useState<Link[]>(initialLinks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewLinkValues>({
    resolver: zodResolver(NewLinkSchema),
    mode: "onSubmit",
  });

  const handleCreateLink = (values: NewLinkValues) => {
    startTransition(async () => {
      const res = await CreateLink(values);

      if (!res.success) {
        toast.error("Failed to create link", { position: "top-center" });
        return;
      }

      setLinks((prev) => [
        ...prev,
        {
          id: `${Date.now()}`,
          userId: "temp",
          collectionId: null,
          title: values.title,
          url: values.url,
          isActive: true,
          position: prev.length,
          collectionPosition: null,
          thumbnail: null,
          icon: null,
          _count: { linkClicks: 0 },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      toast.success("Link created!", { position: "top-center" });
      reset();
      setIsDialogOpen(false);
    });
  };

  const handleDeleteLink = (linkId: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== linkId));

    startTransition(async () => {
      const res = await DeleteLink(linkId);
      if (!res.success) {
        toast.error("Failed to delete link", { position: "top-center" });
        setLinks((prev) => [
          ...prev,
          initialLinks.find((l) => l.id === linkId)!,
        ]);
        return;
      }
      toast.success("Link deleted!", { position: "top-center" });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    let newOrderIds: string[] | null = null;

    setLinks((prev) => {
      const ids = prev.map((l) => l.id);
      const oldIndex = ids.indexOf(active.id as string);
      const newIndex = ids.indexOf(over.id as string);

      if (oldIndex === -1 || newIndex === -1) return prev;

      const reordered = arrayMove(prev, oldIndex, newIndex);
      newOrderIds = reordered.map((l) => l.id);
      return reordered;
    });

    if (newOrderIds) {
      startTransition(async () => {
        const res = await ReorderLinks(newOrderIds as string[]);
        if (!res.success) {
          toast.error("Failed to save order", { position: "top-center" });
        }
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient" className="h-9 px-4 cursor-pointer">
              New Link
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Link</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(handleCreateLink)}
              className="space-y-4 mt-2"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="title">
                  Title
                </label>
                <Input
                  id="title"
                  placeholder="My cool project"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-xs text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="url">
                  URL
                </label>
                <Input
                  id="url"
                  placeholder="https://example.com"
                  {...register("url")}
                />
                {errors.url && (
                  <p className="text-xs text-destructive">
                    {errors.url.message}
                  </p>
                )}
              </div>

              <DialogFooter className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    reset();
                    setIsDialogOpen(false);
                  }}
                  disabled={isSubmitting}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="gradient"
                  disabled={isSubmitting}
                  className="cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {links.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          You haven&apos;t added any links yet.
        </p>
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={links.map((l) => l.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <SortableLinkRow
                  key={link.id}
                  link={link}
                  onDelete={handleDeleteLink}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

type SortableLinkRowProps = {
  link: any;
  onDelete: (linkId: string) => void;
};

function SortableLinkRow({ link, onDelete }: SortableLinkRowProps) {
  const { id, title, url } = link;

  const sortable = useSortable({ id });
  const { attributes, listeners, setNodeRef, transform, transition } = sortable;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-2xl flex flex-row border items-center bg-muted/20 overflow-hidden"
    >
      <button
        type="button"
        className="cursor-grab h-full w-8 flex items-center justify-center border-r"
        aria-label="Reorder"
        {...listeners}
        {...attributes}
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex flex-row items-center justify-between w-full px-4 py-3 gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <LinkIcon className="h-4 w-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium truncate">{title}</span>
            <a
              href={url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground truncate"
            >
              {url}
            </a>
          </div>
        </div>

        <div className="flex items-center flex-1 justify-end gap-4">
          <p className="text-muted-foreground text-xs flex-1">
            {new Date(link.createdAt).toLocaleDateString()}
          </p>

          <div className="flex items-center gap-2 flex-1 justify-end">
            <p
              className="flex items-center gap-0 text-muted-foreground text-sm"
              title="Total Clicks"
            >
              {link._count.linkClicks}
              <MousePointer2 className="h-4 w-4" />
            </p>
            <Button
              type="button"
              variant={"ghost"}
              title="Delete link"
              className="h-8 w-8 inline-flex items-center justify-center rounded-md transition cursor-pointer text-red-500 hover:bg-red-500/10 hover:text-red-500"
              aria-label="Delete link"
              onClick={() => onDelete(id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
