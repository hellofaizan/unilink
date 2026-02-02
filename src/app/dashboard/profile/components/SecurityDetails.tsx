import { User } from "@prisma/client";
import { AlertTriangle } from "lucide-react";
import React from "react";
import DeleteAccount from "./deleteAccount";

interface UserDataProps {
  user: User | null;
}

export default function SecurityDetails({ user }: UserDataProps) {
  return (
    <div className="mt-12 border-t pt-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-destructive flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Delete account
          </h3>
          <p className="text-sm text-muted-foreground">
            Permanently remove your account from Unilink
          </p>
        </div>
        <DeleteAccount user={user} />
      </div>
    </div>
  );
}
