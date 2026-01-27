"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { z } from "zod";
import { TriangleAlert, EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { FormSuccess } from "../../components/formsuccess";

export default function ResetPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const togglePassword = () => {
    setVisiblePassword((prev) => !prev);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (success) {
      timeoutId = setTimeout(() => {
        router.push("/login");
      }, 5000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [success, router]);
  return (
    <div className="mx-auto border rounded-xl overflow-hidden flex flex-col items-center justify-center py-2 lg:py-0 mt-4">
      <div className="mx-auto w-full rounded-sm max-w-md p-3 md:rounded-lg md:p-8 bg-card">
        <h2 className="text-xl font-bold">Forgot Password</h2>
        <p className="mt-2 max-w-sm text-sm">
          Enter a new password below and you are good to go.
        </p>

        <div className="my-4 h-px w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <form
          // onSubmit={handleSubmit(onsUubmit)}
          className="flex w-full flex-col items-center justify-center gap-4"
        >
          <div className="relative flex w-full items-center justify-center">
            <div className="relative w-full">
              <Input
                id="password"
                type={visiblePassword ? "text" : "password"}
                placeholder="new password"
                className={cn(
                  "w-full rounded-md p-2 px-3 pr-8",
                  // errors.password && "border-destructive"
                )}
                //   {...register("password")}
              />
              <div className="flex items-center absolute right-1 top-1/2 -translate-y-1/2">
                <button
                  type="button"
                  onClick={togglePassword}
                  className="text-muted-foreground hover:text-foreground cursor-pointer mr-1"
                >
                  {visiblePassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
                {/* {errors.password && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          className="cursor-pointer rounded-md p-0.2 z-10"
                          variant="ghost"
                          size="icon-sm"
                        >
                          <TriangleAlert className="h-4 w-4 text-destructive" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="px-3 py-1 rounded-md bg-muted border">
                        {errors.password.message}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )} */}
              </div>
            </div>
          </div>
          {success ? (
            <div className="flex w-full flex-col gap-4">
              <FormSuccess message={success} />
              <Link href="/login" className="w-full">
                <Button className="flex w-full gap-1">Back to login</Button>
              </Link>
            </div>
          ) : (
            <>
              <Button
                type="submit"
                className="flex w-full gap-1 cursor-pointer"
                disabled={disabled}
              >
                {loading && <Loader className="animate-spin" size={16} />}
                {!loading ? "Reset Password" : "Resetting..."}
              </Button>
              <Link href="/login" className="w-full">
                <Button
                  variant="outline"
                  className="flex w-full gap-1 cursor-pointer"
                >
                  Back to login
                </Button>
              </Link>
            </>
          )}

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
        </form>
      </div>
    </div>
  );
}
