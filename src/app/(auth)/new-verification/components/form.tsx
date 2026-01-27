"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader, TriangleAlert } from "lucide-react";
import { FormSuccess } from "../../components/formsuccess";

export default function VerificationForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(
    
  );
  const [disabled, setDisabled] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div className="mx-auto border rounded-xl overflow-hidden flex flex-col items-center justify-center lg:py-0 mt-4 w-full">
      <div className="mx-auto w-full max-w-md rounded-sm p-3 shadow-input md:rounded-lg md:p-8 bg-card">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Get Verified</h2>
        </div>
        <p className="mt-2 max-w-sm text-sm">
          Give us a moment to verify your account.
        </p>

        <div className="h-px w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700 mt-2" />

        <div className="mb-2 flex w-full flex-col items-center justify-center mt-2">
          {!error && !success && (
            <Loader size={30} className="animate-spin my-2" />
          )}
          <div className="w-ful mt-2">
            {disabled ? (
              <Button disabled={disabled} className="w-full mt=2">
                Verifying...
              </Button>
            ) : (
              <Link href={"/login"} className="w-full">
                <Button disabled={disabled} className="w-full mt-2">
                  Go to Login
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {error && (
            <div
              className="relative w-full rounded-md border border-red-600 bg-red-200 px-3 py-2 text-gray-900 dark:border-red-700/40 dark:bg-red-600/20 dark:text-gray-300"
              role="alert"
            >
              <span className="flex items-center gap-1 text-sm">
                <TriangleAlert size={14} /> {error}
              </span>
            </div>
          )}

          {success && <FormSuccess message={success} />}
        </div>
      </div>
    </div>
  );
}
