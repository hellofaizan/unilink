"use client";

import UpdateProfile from "@/action/updatebio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getProfileErrorMessage } from "@/lib/errors/error-message";
import { UpdateProfileResult } from "@/lib/errors/profile-error";
import { cn } from "@/lib/utils";
import { UpdateProfileSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import {
  Loader,
  Loader2,
  ShieldUser,
  TriangleAlert,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import ImageUploadComponent from "./imageUpload";

type formValues = z.infer<typeof UpdateProfileSchema>;

interface GeneralSettingsProps {
  user: User | null;
}

export default function GeneralSettings({ user }: GeneralSettingsProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [usernameLoading, setUsernameLoading] = useState<boolean>(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null,
  );
  const [disabled, setDisabled] = useState<boolean>(true);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm<formValues>({
    resolver: zodResolver(UpdateProfileSchema),
    mode: "onChange",
    defaultValues: {
      name: user?.name || "",
      bio: user?.bio || "",
      username: user?.username || "",
    },
  });

  const initialValues = {
    name: user?.name || "",
    bio: user?.bio || "",
    username: user?.username || ""
  };
  const watchedName = watch("name");
  const watchedBio = watch("bio");
  const watchedUsername = watch("username");

  useEffect(() => {
    if (!watchedUsername || watchedUsername === user?.username) {
      setUsernameAvailable(null);
      return;
    }

    if (!/^[a-zA-Z0-9_]{1,20}$/.test(watchedUsername)) {
      setUsernameAvailable(null);
      return;
    }

    setUsernameLoading(true);

    const timeOut = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/checkusername?username=${watchedUsername.toLowerCase()}`,
        );

        const data = await res.json();
        setUsernameAvailable(data.available);
      } catch (error) {
        setUsernameAvailable(null);
      } finally {
        setUsernameLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeOut);
  }, [watchedUsername, user?.username]);

  useEffect(() => {
    const hasChanges =
      watchedName !== initialValues.name ||
      watchedBio !== initialValues.bio ||
      watchedUsername !== initialValues.username;

    const usernameBlocked = Boolean(
      watchedUsername &&
      watchedUsername !== initialValues.username &&
      usernameAvailable === false,
    );

    setDisabled(!hasChanges || usernameBlocked);
  }, [
    watchedName,
    watchedBio,
    watchedUsername,
    usernameAvailable,
    initialValues.name,
    initialValues.bio,
    user?.username,
  ]);

  const onSubmit = async (data: formValues) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res: UpdateProfileResult = await UpdateProfile(data);

      if (!res.success) {
        setError(getProfileErrorMessage(res.error));
        return;
      }

      setSuccess("✅ Profile updated successfully!");
      setDisabled(true);
    } catch {
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="border rounded-lg p-6 flex flex-col gap-1">
      <p className="text-2xl font-semibold">General Settings</p>
      <span className="text-sm text-muted-foreground">
        This is how visiotrs will see your presence online.
      </span>

      <ImageUploadComponent user={user} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="text-sm font-medium flex items-center gap-2"
            >
              <UserIcon className="h-4 w-4" />
              Display Name
            </label>
            <Input
              id="name"
              placeholder="your name"
              className={cn("h-11", errors.name && "border-destructive")}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="username"
              className="text-sm font-medium flex items-center gap-2"
            >
              <ShieldUser className="h-4 w-4" />
              Username
            </label>
            <div className="relative">
              <Input
                id="username"
                placeholder="username"
                className={cn(
                  "h-11 pr-10",
                  errors.username && "border-destructive",
                  usernameAvailable === false && "border-destructive",
                  usernameAvailable === true && "border-emerald-500",
                )}
                {...register("username")}
              />
              {usernameLoading && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
              )}
            </div>
            {errors.username && (
              <p className="text-sm text-destructive mt-1">
                {errors.username.message}
              </p>
            )}
            {usernameAvailable === false && (
              <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                <TriangleAlert className="h-4 w-4" />
                Username is already taken
              </p>
            )}

            {usernameAvailable === true && (
              <p className="text-sm text-emerald-500 mt-1">
                Username is available
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="text-sm font-medium flex items-center gap-2"
            >
              <UserIcon className="h-4 w-4" />
              About you
            </label>
            <Textarea
              id="bio"
              placeholder="introduce yourself to the visitors"
              className={cn("resize-y", errors.bio && "border-destructive")}
              {...register("bio")}
              rows={4}
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1.5">
                {errors.bio?.message}
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
              {error}
            </p>
          )}

          {success && (
            <p className="text-sm text-emerald-500 bg-emerald-500/10 p-3 rounded-lg">
              {success}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 justify-end">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => {
              reset();
              setDisabled(true);
            }}
            disabled={loading}
            className="h-10 cursor-pointer"
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={loading || disabled}
            variant={"gradient"}
            className="h-10 px-6 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Profile"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
