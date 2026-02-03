import React from "react";
import { GetSocials } from "@/action/add-social";
import { SocialsManager } from "./Manager/SocialsManager";

export default async function page() {
  const socials = await GetSocials();

  return (
    <div className="md:p-8 max-w-300 mx-auto">
      <div className="flex flex-col gap-1.5 mb-5">
        <p className="text-2xl font-medium">Link your social media profiles.</p>
        <p className="text-muted-foreground">
          Display all your social links on your unilink profile where people can find you online.
        </p>
      </div>

      <SocialsManager initialSocials={socials.data || []} />
    </div>
  );
}
