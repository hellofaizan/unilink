import { DeleteAccountAction } from "@/action/deleteAccount";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import { AlertTriangle, Loader, XCircle } from "lucide-react";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "sonner";

interface UserDataProps {
  user: User | null;
}

export default function DeleteAccount({ user }: UserDataProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [VerificationEmail, setVerificationEmail] = useState<string | "">("");
  const [error, setError] = useState<string | "">("");

  const deleteAccount = async () => {
    setLoading(true);
    setError("");

    await DeleteAccountAction(user?.id as string)
      .then((res) => {
        if (res.error) {
          toast.error(res.error, { position: "top-center" });
        } else {
          toast.success("Account deleted successfully!", {
            position: "top-center",
          });
          signOut();
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        toast.error("An error occured while deleting your account", {
          position: "top-center",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleVerification = () => {
    const text = VerificationEmail.trim();
    if (text === user?.email) {
      deleteAccount();
    } else {
      setError("Please enter your email address to confirm");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} className="cursor-pointer">
          Delete Account
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete Account Permanently
          </DialogTitle>
          <div className="space-y-4 pt-2 text-sm text-muted-foreground">
            <p>
              This action{" "}
              <span className="font-semibold">cannot be undone</span>. This will
              permanently delete your account and remove your data from our
              servers immediately.
            </p>

            <p className="text-sm text-muted-foreground">
              Please type{" "}
              <span className="font-mono font-bold text-foreground">YOUR EMAIL</span> below to
              confirm.
            </p>
            <Input
              className="h-9"
              placeholder="Type your email to confirm"
              value={VerificationEmail}
              onChange={(e) => {
                setVerificationEmail(e.target.value);
                setError("");
              }}
            />
          </div>
        </DialogHeader>
        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>

          <Button
            variant={"destructive"}
            type="submit"
            disabled={loading || VerificationEmail.trim() !== user?.email}
            onClick={handleVerification}
          >
            {loading ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                Delete Account
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
