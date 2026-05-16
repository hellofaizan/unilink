"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  GripVertical,
  Layers,
  Link2,
  Share2,
  Smartphone,
} from "lucide-react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

type BentoItem = {
  title: string;
  description: string;
  className: string;
  icon: LucideIcon;
  hasMedia?: boolean;
  image?: string;
};

const bentoItems: BentoItem[] = [
  {
    title: "Drag-and-drop links",
    description: "Reorder links and collections in seconds.",
    image: "/landing/dnd-demo.mp4",
    className: "md:col-span-7 md:row-span-3",
    icon: GripVertical,
    hasMedia: true,
  },
  {
    title: "40+ social platforms",
    description: "Connect every channel with branded icons.",
    className: "md:col-span-5",
    icon: Share2,
  },
  {
    title: "Rich link cards",
    description: "Thumbnails, titles, and toggles for every link.",
    className: "md:col-span-5",
    icon: Link2,
  },
  {
    title: "Link collections",
    description: "Group links into sections your audience can browse.",
    className: "md:col-span-5",
    icon: Layers,
  },
  {
    title: "Built-in analytics",
    description: "Visits, clicks, referrers, and devices in one place.",
    className: "md:col-span-6",
    icon: BarChart3,
  },
  {
    title: "Mobile-first profiles",
    description: "Looks perfect on every screen size.",
    className: "md:col-span-6",
    icon: Smartphone,
  },
];

function BentoCard({ item, index }: { item: BentoItem; index: number }) {
  return (
    <BlurFade
      inView
      delay={0.05 * index}
      className={cn("h-full", item.className)}
    >
      <motion.div
        whileHover={{ y: -2, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/95 shadow-sm backdrop-blur-sm transition-shadow hover:border-primary/25 hover:shadow-lg",
          item.hasMedia ? "min-h-[320px]" : "min-h-[140px] md:min-h-[160px]",
        )}
      >
        {item.hasMedia && item.image ? (
          <>
            <div className="relative flex-1 overflow-hidden bg-linear-to-b from-primary/5 to-muted/20">
              <video
                className="h-full w-full object-contain"
                controls={false}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                src={item.image}
              >
                Your browser does not support embedded video.
              </video>{" "}
              {/* <div className="absolute inset-0 bg-linear-to-t from-card/90 via-card/20 to-transparent" /> */}
            </div>
            <div className="relative border-t border-border/40 p-5">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <item.icon className="h-4 w-4" />
              </div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col justify-between gap-6 p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </BlurFade>
  );
}

export function BentoGridSection() {
  return (
    <section id="features" className="w-full py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <BlurFade inView>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Features
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Everything to grow your audience
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              A modular toolkit for links, socials, and insights designed like a
              modern product.
            </p>
          </div>
        </BlurFade>

        <div className="mt-14 grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-12">
          {bentoItems.map((item, i) => (
            <BentoCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
