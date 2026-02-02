import { Suspense } from "react";
import { auth } from "@/server/auth";
import { getUserById } from "@/server/user";
import SettingsPageClient from "./settings-page";

export default async function SettingsPage() {
  const session = await auth();
  const user = session?.user?.id ? await getUserById(session.user.id) : null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsPageClient user={user} />
    </Suspense>
  );
}
