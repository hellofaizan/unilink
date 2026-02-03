"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { SocialPlatform } from "./social-data";
import { Loader, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AddSocial } from "@/action/add-social";

type Mode = "create" | "edit";

interface Props {
  social: SocialPlatform;
  children: React.ReactNode;

  mode?: Mode;
  initialHandle?: string;
  initialUrl?: string;
  socialId?: string;
}

export function AddSocialModal({
  social,
  children,
  mode = "create",
  initialHandle,
  initialUrl,
  socialId,
}: Props) {
  const [username, setUsername] = useState<string | "">(initialHandle ?? "");
  const [customUrl, setCustomUrl] = useState<string>(initialUrl ?? "");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | "">("");

  const isCustom = social.isCustom;

  useEffect(() => {
    if (open && mode === "edit") {
      setUsername(initialHandle ?? "");
      setCustomUrl(initialUrl ?? "");
    }
  }, [open, mode, initialHandle, initialUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let urlToSave = "";

      if (isCustom) {
        urlToSave = customUrl.trim();
        if (
          urlToSave.startsWith("https://") &&
          urlToSave.startsWith("https://")
        ) {
          setError("URL must not start with http:// or https://");
          setLoading(false);
          return;
        }
      }

      const result = await AddSocial({
        type: social.id,
        handle: !isCustom ? username.trim() : "",
        url: isCustom ? urlToSave : "",
      });

      if (result.success) {
        setOpen(false);
        setUsername("");
        setCustomUrl("");
      } else {
        setError(result.error || "Failed to save social");
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-110">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {mode === "edit" ? "Edit" : "Add"} {social.name} Social
          </DialogTitle>
          <div className="space-y-4 pt-2">
            {isCustom ? (
              <>
                <p className="text-sm text-muted-foreground">
                  Save a custom Url.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <Input
                    type="url"
                    placeholder="example.com"
                    className="peer h-10 bg-none text-foreground"
                    value={customUrl}
                    onChange={(e) => {
                      setCustomUrl(e.target.value);
                      setError("");
                    }}
                    disabled={loading}
                  />
                  {error && (
                    <p className="text-sm text-destructive mt-1">{error}</p>
                  )}
                </form>
              </>
            ) : (
              <div className="space-y-4 pt-2 text-sm text-muted-foreground">
                <p>Enter your {social.name} username to link your profile.</p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <div className="flex border rounded-lg bg-input px-2">
                      <Image
                        src={social.icon}
                        alt={social.name}
                        width={28}
                        height={28}
                      />
                      <span className="flex flex-none items-center justify-center pl-2 text-sm w-max">
                        {social.baseUrl}
                      </span>
                      <Input
                        type="text"
                        placeholder="...."
                        className="peer h-10 border-0 bg-none px-0 text-foreground flex-1"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          setError("");
                        }}
                        disabled={loading}
                      />
                    </div>

                    {error && (
                      <p className="text-xs text-destructive mt-1">{error}</p>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </DialogHeader>
        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button variant={"outline"} disabled={loading}>
              Cancel
            </Button>
          </DialogClose>

          <Button
            variant={"default"}
            type="submit"
            disabled={
              (isCustom ? !customUrl.trim() : !username.trim()) || loading
            }
            onClick={handleSubmit}
            autoFocus={mode === "edit"}
          >
            {loading ? (
              <>Saving...</>
            ) : mode === "edit" ? (
              "Save Changes"
            ) : (
              "Add Social"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
