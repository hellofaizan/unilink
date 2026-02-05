import React, { Suspense } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useSession } from "next-auth/react";

export default function CTAButton() {
  const session = useSession();
  return (
    <Suspense
      fallback={
        <div className="flex w-full">
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      }
    >
      {session && session.data !== null ? (
        <Link href={"/dashboard"}>
          <Button size={"lg"} variant={"gradient"} className="rounded-xl">
            DASHBOARD
          </Button>
        </Link>
      ) : (
        <Link href={"/register"}>
          <Button size={"lg"} variant={"gradient"} className="rounded-xl">
            GET STARTED
          </Button>
        </Link>
      )}
    </Suspense>
  );
}
