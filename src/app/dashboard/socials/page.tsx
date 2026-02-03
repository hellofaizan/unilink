import React from "react";
import { currentUser } from "@/server/user";
import { DeleteSocial, GetSocials } from "@/action/add-social";
import { SocialList } from "./SocialsList";
import { SocialPicker } from "./SocialPicker";

export default async function page() {
  const user = await currentUser();
  const socials = await GetSocials();

  async function handleDelete(id: string) {
    "use server";
    await DeleteSocial(id);
  }

  async function handleEdit(id: string) {
    "use server";
    // no-op for now, edit is handled via the add/edit modal
    console.log("Edit social with id:", id);
  }

  return (
    <div className="md:p-8 max-w-300 mx-auto">
      <div className="flex flex-col gap-1.5 mb-5">
        <p className="text-2xl font-medium">Link your social media profiles.</p>
        <p className="text-muted-foreground">
          Display all your social links on your unilink profile.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <SocialPicker
          existingSocialTypes={socials.data?.map((s) => s.type) || []}
        />
        <SocialList
          socials={socials.data || []}
          onDeleteSocial={handleDelete}
          onEditSocial={handleEdit}
        />
      </div>
    </div>
  );
}
