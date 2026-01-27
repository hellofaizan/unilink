"use client";

import React, { useState } from "react";
import { z } from "zod";
import { TriangleAlert } from "lucide-react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FormSuccess } from "../../components/formsuccess";

export default function form() {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  return (
    <div className="flex border rounded-xl overflow-hidden items-center justify-center mt-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-6 px-4 shadow-sm rounded-lg sm:px-10">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-foreground">
              Forgot Password
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email and we&apos;ll send you instructions to reset
              your password
            </p>
          </div>

          <form
            //   onSubmit={handleSubmit(onSubmit)}
            className="space-y-3"
          >
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className={cn(
                  "border",
                  // errors.email && "border-destructive"
                )}
                // {...register("email")}
              />
              {/* {errors.email && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-0.2"
                        variant="ghost"
                        size="xs"
                      >
                        <TriangleAlert className="h-4 w-4 text-destructive" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="px-3 py-1 rounded-md bg-muted border">
                      {errors.email.message}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )} */}
            </div>

            <Button
              type="submit"
              className="flex w-full justify-center cursor-pointer"
              disabled={disabled}
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
            {error && (
              <div className="text-sm text-destructive">
                <TriangleAlert className="mr-1 inline h-4 w-4" />
                {error}
              </div>
            )}

            {success && <FormSuccess message={success} />}
          </form>
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">
              Remember your password?
            </span>{" "}
            <Link
              href="/login"
              className="font-medium underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
