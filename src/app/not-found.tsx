import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col gap-2 items-center min-h-dvh justify-center hc w-full">
      <h4 className="text-center text-lg font-medium">
        The page you are looking for does not exist.
      </h4>
      <Link href={"/"}>
        <Button size={"lg"} className="cursor-pointer">
          Go Back
        </Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
