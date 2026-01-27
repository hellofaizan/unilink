"use client";

import { EyeIcon, EyeOffIcon, Loader, TriangleAlert } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { FormSuccess } from "./formsuccess";

export default function LoginForm() {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const [showOTPInput, setShowOTPInput] = useState(false);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "SessionExpired") {
      setError("Your session has expired. Please log in again.");
    }
  }, [searchParams]);

  const togglePassword = () => {
    setVisiblePassword((prev) => !prev);
  };
  return (
    <form
      // onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {error && (
        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md flex items-center gap-x-2">
          <TriangleAlert className="h-4 w-4" />
          {error}
        </div>
      )}
      {success && <FormSuccess message={success} />}

      <div className="w-full items-center">
        {!showOTPInput ? (
          <div className="flex flex-col gap-3 w-full">
            <div className="space-y-2">
              <Label htmlFor="relative">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="name@gmail.com"
                  className={cn(
                    "border",
                    // errors.email && "border-destructive",
                  )}
                  disabled={disabled}
                  //   {...register(disabled)}
                />
                {/* {errors.email && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-0.2"
                          variant="ghost"
                          size="icon-sm"
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={visiblePassword ? "text" : "password"}
                  placeholder="your password"
                  //   {...register("password")}
                  className={cn(
                    "border",
                    // errors.password && "border-destructive",
                  )}
                  disabled={disabled}
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
                            size="xs"
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
            <div className="flex items-center justify-end">
              <div className="flex items-center space-x-2">
                <Link
                  href={"/forgot"}
                  className="text-xs hover:underline text-muted-foreground hover:text-foreground"
                >
                  Forgot Passwor?
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <Input
            type="text"
            placeholder="2FA COde"
            className="w-full p-2 px-3"
            autoFocus={showOTPInput}
            // {...register("code")}
          />
        )}
      </div>

      <Button type="submit" className="w-full text-white" disabled={disabled}>
        {loading ? (
          <>
            <Loader className="mr -2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          "Login In"
        )}
      </Button>
    </form>
  );
}
