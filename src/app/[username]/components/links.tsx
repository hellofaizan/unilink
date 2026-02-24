import React from "react";
import type { Link } from "@prisma/client";

interface LinksProps {
  links: Pick<Link, "id" | "title" | "url">[];
}

export default function PublicLinks({ links }: LinksProps) {
  if (!links.length) {
    return null;
  }

  return (
    <section className="mt-6 w-full md:max-w-xl md:mx-auto flex flex-col gap-3">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-2xl border bg-muted/20 px-4 py-3 hover:bg-muted/40 transition"
        >
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium truncate">
              {link.title}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {link.url}
            </span>
          </div>
        </a>
      ))}
    </section>
  );
}

