import { Suspense } from "react";
import { auth } from "@/server/auth";
import { getUserById } from "@/server/user";
import SettingsPageClient from "./settings-page";

export default async function SettingsPage() {
  const session = await auth();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsPageClient user={session?.user} />
    </Suspense>
  );
}
