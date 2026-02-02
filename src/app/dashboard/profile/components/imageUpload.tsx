"use client";

import { Button } from "@/components/ui/button";
import { useUploadThing } from "@/lib/uploadthing";
import { User } from "@prisma/client";
import Image from "next/image";
import { Suspense, useRef, useState } from "react";
import Resizer from "react-image-file-resizer";
import { UploadAvatar } from "@/action/upload-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface GeneralSettingsProps {
  user: User | null;
}

export default function ImageUploadComponent({ user }: GeneralSettingsProps) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user?.image || null,
  );
  const [avatarLoading, setAvatarLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { startUpload } = useUploadThing("imageUploader", {
    onUploadProgress(p) {
      setUploadProgress(p);
    },
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const resizeImage = (file: File): Promise<File> =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        400,
        400,
        "WEBP",
        70,
        0,
        (uri) => resolve(uri as File),
        "file",
      );
    });

  const onAvatarSelect = async (file: File) => {
    try {
      setAvatarLoading(true);
      setError(null);
      setUploadProgress(0);

      const resized = await resizeImage(file);
      const previewUrl = URL.createObjectURL(resized);
      setAvatarPreview(previewUrl);

      const uploaded = await startUpload([resized]);
      const imageUrl = uploaded?.[0]?.ufsUrl;
      const imageKey = uploaded?.[0]?.key;

      if (!imageUrl) {
        throw new Error("UPLOAD_FAILED");
      }

      const res = await UploadAvatar(imageUrl, imageKey as string);
      if (!res.success) {
        throw new Error("DB_UPDATE_FAILED");
      }

      toast.success("Image uploaded successfully!", { position: "top-center" });
    } catch {
      setError("Failed to upload profile picture.");
      setAvatarPreview(user?.image || "");

      toast.error("Something went wrong!", { position: "top-center" });
    } finally {
      setAvatarLoading(false);
      setUploadProgress(0);
      fileInputRef.current!.value = "";
    }
  };

  return (
    <div className="flex relative overflow-hidden gap-2 items-center border px-4 py-6 rounded-lg bg-border/30 mt-2 mb-2">
      <Avatar className="h-auto w-auto">
        <Suspense fallback={<AvatarFallback>UNI</AvatarFallback>}>
          <Image
            alt={user?.name as string}
            src={avatarPreview as string}
            className="rounded-full border"
            width={70}
            height={70}
          />
        </Suspense>
      </Avatar>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">
          Upload a new profile picture (Max 1MB)
        </span>
        <div className="flex items-center">
          <input
            id="fileUpload"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onAvatarSelect(file);
            }}
          />
          <Button
            type="button"
            className="w-max text-xs font-medium cursor-pointer"
            size="sm"
            variant={"gradient"}
            disabled={avatarLoading}
            onClick={() => fileInputRef.current?.click()}
          >
            {avatarLoading ? "Uploading..." : "Choose File"}
          </Button>
          {error && (
            <p className="text-xs text-destructive bg-destructive/10 p-2.5 rounded-lg ml-2">
              {error}
            </p>
          )}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 h-1 bg-emerald-500 transition-all duration-500 ease-in"
        style={{ width: `${uploadProgress}%` }}
      />
    </div>
  );
}
