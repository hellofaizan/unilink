"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function GetVerifiedBanner({ ...props }) {
  const user = props.user;
  return (
    <div className="p-6 border-2 border-dashed border-muted rounded-lg">
      <div className="flex shrink-0 items-center w-full">
        <div className="flex items-center space-x-4 w-full">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user.image || ""} />
            <AvatarFallback>UNI</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1 w-full">
            <span className="font-medium text-xl leading-none gap-1 flex items-center">
              {user.name}
              <img src={"/checkmark.svg"} className="w-4 h-4" />
            </span>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <button className="flex items-center gap-2 border rounded-lg cursor-pointer h-max w-max py-1 px-2 flex-none hover:bg-border border-dashed">
            <img src={"/checkmark.svg"} className="w-5 h-5" />
            Get Verified
          </button>
        </div>
      </div>
    </div>
  );
}
