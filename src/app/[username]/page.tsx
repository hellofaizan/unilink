import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Loader } from "lucide-react";
import { getUserByUsername } from "@/server/user";
import UsernamePage from "./main/UsernamePage";

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;

  const user = await getUserByUsername(username);
  if (!user) {
    return {
      title:
        "Unilink - A minimal and rich link in bio website | Claim this username",
      description: `The profile "${username}" does not exist on Unilink. Claim now`,
      applicationName: "Unilink",
      twitter: {
        creator: "@curiousfaizaan",
        card: "summary",
        title:
          "Unilink - A minimal and rich link in bio website | Claim this username",
        description: `The profile "${username}" does not exist on Unilink. Claim now`,
      },
      openGraph: {
        title: "Unilink - A minimal and rich link in bio",
        description: `The profile "${username}" does not exist on Unilink. Claim now`,
      },
    };
  }

  const displayName = user.name || user.username || username;
  const description =
    user.bio && user.bio.length > 0
      ? `${user.bio} | ${displayName} on Unilink`
      : `View ${displayName}'s profile and links on Unilink - a rich link in bio.`;
  const imageUrl = user.image || "/favicon.ico";

  return {
    title: `${displayName} on Unilink - Link in bio`,
    description,
    icons: [
      {
        url: imageUrl,
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: imageUrl,
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: imageUrl,
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
    openGraph: {
      title: `${displayName} on Unilink`,
      description,
      images: [{ url: imageUrl, alt: displayName }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${displayName} on Unilink`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function Page({ params }: Props) {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    return (
      <div className="flex w-full min-h-dvh items-center justify-center md:min-h-screen">
        <p className="text-sm text-muted-foreground">
          This profile does not exist on Unilink.
        </p>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex w-full min-h-dvh items-center justify-center md:min-h-screen">
          <Loader className="animate-spin" />
        </div>
      }
    >
      <UsernamePage user={user} />
    </Suspense>
  );
}
