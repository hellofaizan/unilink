import React, { Suspense } from "react";
import { GetLinks } from "@/action/links";
import LinksManager from "./LinksManager";
import { Loader } from "lucide-react";

export default async function page() {
  const links = await GetLinks();

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-full bg-background z-20 min-h-dvh md:min-h-screen">
          <Loader className="animate-spin w-10 h-10" />
        </div>
      }
    >
      <div className="md:p-8 max-w-300 mx-auto">
        <div className="flex flex-col gap-1.5 mb-5">
          <p className="text-2xl font-medium">Add links to Unilink profile.</p>
          <p className="text-muted-foreground">
            Attach your links on your unilink profile.
          </p>
        </div>

        {links.success && <LinksManager initialLinks={links.data || []} />}
      </div>
    </Suspense>
  );
}
