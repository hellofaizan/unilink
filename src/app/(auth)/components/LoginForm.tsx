"use client";

import { EyeIcon, EyeOffIcon, Loader, TriangleAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "@/schemas";
import { toast } from "sonner";
import Link from "next/link";
import LoginUser from "@/action/login";
import { FormSuccess } from "./formsuccess";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type formValues = z.infer<typeof login>;

export default function LoginForm() {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<formValues>({
    resolver: zodResolver(login),
    mode: "onChange",
  });

  const onSubmit = async (data: formValues) => {
    setDisabled(true);
    setLoading(true);
    setError(null);
    setSuccess(null);

    await LoginUser({ data }).then((res) => {
      if (res && res.error) {
        setError(res.error || "An error occured");
        setLoading(false);
        setDisabled(false);
      } else if (res && res.notVerified) {
        setSuccess(res.notVerified || "Email not verified yet");
        setLoading(false);
        setDisabled(false);
      } else {
        toast.success("Logged in successfully");
        setLoading(false);
        setDisabled(false);
      }
    });
  };

  const togglePassword = () => {
    setVisiblePassword((prev) => !prev);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md flex items-center gap-x-2">
          <TriangleAlert className="h-4 w-4" />
          {error}
        </div>
      )}
      {success && <FormSuccess message={success} />}

      <div className="flex flex-col gap-3 w-full">
        <div className="space-y-2">
          <Label htmlFor="relative">Email</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="name@gmail.com"
              className={cn("border", errors.email && "border-destructive")}
              disabled={disabled}
              {...register("email")}
            />
            {errors.email && (
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
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={visiblePassword ? "text" : "password"}
              placeholder="your password"
              {...register("password")}
              className={cn("border", errors.password && "border-destructive")}
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
              {errors.password && (
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
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <div className="flex items-center space-x-2">
            <Link
              href={"/forgot"}
              className="text-xs hover:underline text-muted-foreground hover:text-foreground"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full text-white cursor-pointer"
        disabled={disabled}
      >
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
