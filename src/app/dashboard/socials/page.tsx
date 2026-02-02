import React from "react";
import { SocialPicker } from "./components/SocialPicker";
import { currentUser } from "@/server/user";
import { db } from "@/lib/db";

export default async function page() {
  const user = await currentUser();
  return (
    <div className="md:p-8 max-w-300 mx-auto">
      <div className="flex flex-col gap-1.5 mb-5">
        <p className="text-2xl font-medium">Link your social media profiles.</p>
        <p className="text-muted-foreground">
          Display all your social links on your unilink profile.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <SocialPicker />
      </div>
    </div>
  );
}
