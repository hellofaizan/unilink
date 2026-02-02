"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { ChangePasswordSchema } from "@/schemas";
import { ChangePassword } from "@/action/change-password";
import { User } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";

type PasswordFormValues = z.infer<typeof ChangePasswordSchema>;

interface UserProps {
  user: User | null;
}

export default function ChangePasswordComponent({ user }: UserProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
  });

  const togglePassword = () => {
    setVisiblePassword((prev) => !prev);
  };

  const onSubmit = async (data: PasswordFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    await ChangePassword(data.password, user?.id as string).then((res) => {
      try {
        if (res && res.error) {
          setError(res.error || "An unexpected error occured!");
        } else {
          setSuccess(res.success ?? "Password changed successfully!");
        }
      } finally {
        setLoading(false);
        setError(null);
        reset();
      }
    });
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-lg font-medium">Password Manager</p>
        {user?.password !== "" ? (
          <p className="text-sm text-muted-foreground">
            Your credentials are encrypted and stored securely.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Set a password for your account to log in with your email and
            password in the future.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
          <div className="relative w-full">
            <Input
              id="password"
              type={visiblePassword ? "text" : "password"}
              placeholder="Enter a new password"
              className="w-full rounded-lg border p-2 px-3 pr-8"
              {...register("password")}
            />
            <div className="absolute right-2 top-1/2 -translate-y-2 h-full cursor-pointer text-muted-foreground">
              {visiblePassword ? (
                <EyeOffIcon size={18} onClick={togglePassword} />
              ) : (
                <EyeIcon size={18} onClick={togglePassword} />
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="flex w-max gap-1 h-10"
            disabled={loading}
          >
            {loading && <Loader className="animate-spin" size={16} />}
            {loading ? "Changing..." : "Change Password"}
          </Button>
        </form>
        {errors && errors.password && (
          <div
            className={
              errors.password ? "flex w-full flex-col gap-1" : "hidden"
            }
          >
            <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {errors.password.message}
            </p>
          </div>
        )}
        {error && (
          <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {error}
          </p>
        )}

        {success && (
          <p className="text-sm text-emerald-500 bg-emerald-500/10 p-3 rounded-md">
            {success}
          </p>
        )}
      </div>
    </div>
  );
}
