import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getUserByUsername } from "@/server/user";
import { Loader } from "lucide-react";
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
        "Unilink - A minimal and rick link in bio website | Claim this username",
      description: `The profile "${username}" does not exist on Unilink. Claim now`,
      applicationName: "Unilink",
      twitter: {
        creator: "@curiousfaizaan",
        card: "summary",
        title:
          "Unilink - A minimal and rick link in bio website | Claim this username",
        description: `The profile "${username}" does not exist on Unilink. Claim now`,
      },
      openGraph: {
        title: "Unilink - A minimal and rick link in bio F",
        description: `The profile "${username}" does not exist on Unilink. Claim now`,
      },
    };
  }

  const displayName = user.name || user.username || username;
  const description =
    user.bio + ` | ${displayName} on Unilink` ||
    `View ${displayName}'s profile and social links on Unilink - A rick link in bio`;
  const imageUrl = user.image as string;

  return {
    title: `${displayName} on Unilink - Link in bio`,
    description,
    icons: [
      {
        url: user?.image || "/favicon.ico",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: user?.image || "/favicon.ico",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: user?.image || "/favicon.ico",
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

export default async function page({ params }: Props) {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    return <div>eebjhebjesb</div>;
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
