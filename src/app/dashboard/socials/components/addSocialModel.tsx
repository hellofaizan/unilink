"use client";

import React from "react";
import Image from "next/image";
import { SocialPlatform } from "./social-data";
import { AlertTriangle, Loader, X } from "lucide-react";
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
import { Label } from "@/components/ui/label";

interface Props {
  social: SocialPlatform;
  children: React.ReactNode;
}

export function AddSocialModal({ social, children }: Props) {
  const [username, setUsername] = useState<string | "">("");
  const [customUrl, setCustomUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | "">("");

  const isCustom = social.isCustom;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-110">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Add {social.name} Social
          </DialogTitle>
          <div className="space-y-4 pt-2">
            {isCustom ? (
              <>
                <p className="text-sm text-muted-foreground">
                  Save a custom Url.
                </p>
                <form /*onSubmit={handleSubmit}*/ className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="custom-url">URL</Label>
                    <Input
                      id="custom-url"
                      className="h-10"
                      placeholder="https://example.com"
                      value={customUrl}
                      onChange={(e) => {
                        setCustomUrl(e.target.value);
                        setError("");
                      }}
                      disabled={loading}
                      type="url"
                    />
                    {error && (
                      <p className="text-xs text-destructive mt-2">{error}</p>
                    )}
                  </div>
                </form>
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  Enter your {social.name} username or handle to link your
                  profile.
                </p>
                <form /*onSubmit={handleSubmit}*/ className="space-y-4">
                  <div>
                    <Input
                      className="h-10"
                      placeholder={`Enter your ${social.name} username`}
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setError("");
                      }}
                      disabled={loading}
                    />
                    {error && (
                      <p className="text-xs text-destructive mt-2">{error}</p>
                    )}
                    {username && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Preview: https://{social.baseUrl}
                        {username}
                      </p>
                    )}
                  </div>
                </form>
              </>
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
            disabled={!username.trim() || loading}
            onClick={() => setLoading(true)}
          >
            {loading ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Social"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
