import { Suspense } from "react";
import { auth } from "@/server/auth";
import { getUserById } from "@/server/user";
import SettingsPageClient from "./settings-page";
import { Loader } from "lucide-react";

export default async function SettingsPage() {
  const session = await auth();
  const user = session?.user?.id ? await getUserById(session.user.id) : null;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-full bg-background z-20 min-h-dvh md:min-h-screen">
          <Loader className="animate-spin w-10 h-10" />
        </div>
      }
    >
      <SettingsPageClient user={user} />
    </Suspense>
  );
}
