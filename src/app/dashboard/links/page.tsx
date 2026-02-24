import React from "react";
import { GetLinks } from "@/action/links";
import LinksManager from "./LinksManager";

export default async function page() {
  const links = await GetLinks();

  return (
    <div className="md:p-8 max-w-300 mx-auto">
      <div className="flex flex-col gap-1.5 mb-5">
        <p className="text-2xl font-medium">Add links to Unilink profile.</p>
        <p className="text-muted-foreground">
          Attach your links on your unilink profile.
        </p>
      </div>

      {links.success && (
        <LinksManager initialLinks={links.data || []} />
      )}
    </div>
  );
}
