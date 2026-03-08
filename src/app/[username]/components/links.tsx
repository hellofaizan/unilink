"use client";

import React from "react";
import Link from "next/link";

interface LinksProps {
  links: {
    id: string;
    title: string;
    url: string | null;
  }[];
  userId: string;
}

export default function PublicLinks({ links, userId }: LinksProps) {
  if (!links.length) {
    return null;
  }

  return (
    <section className="mt-6 w-full md:max-w-xl md:mx-auto flex flex-col gap-3">
      {links.map((link) => (
        <Link
          href={link.url || "#"}
          key={link.id}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-2xl border bg-muted/20 px-4 py-3 hover:bg-muted/40 transition"
          onClick={() =>
            fetch(`/api/linkclick?id=${userId}&link=${link.id}`, {
              method: "POST",
            })
          }
        >
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium truncate">{link.title}</span>
            <span className="text-xs text-muted-foreground truncate">
              {link.url}
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
