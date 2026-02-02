"use client";

import { Cog, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface SettingsNavProps {
  activeTab: string;
  onTabChange: Dispatch<SetStateAction<string>>;
}

export default function SettingsNav({
  activeTab,
  onTabChange,
}: SettingsNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="border-b mb-4">
      <nav className="flex gap-6 -mb-px">
        <button
          onClick={() => onTabChange("profile")}
          className={`flex items-center gap-2 px-1 py-3 text-sm font-medium cursor-pointer ${
            activeTab === "profile"
              ? "border-b-2 border-foreground text-foreground"
              : "text-muted-foreground hover:text-foreground"
          } transition-colors`}
        >
          <User className="w-4 h-4" />
          Profile
        </button>

        <button
          onClick={() => onTabChange("security")}
          className={`flex items-center gap-2 px-1 py-3 text-sm font-medium cursor-pointer ${
            activeTab === "security"
              ? "border-b-2 border-foreground text-foreground"
              : "text-muted-foreground hover:text-foreground"
          } transition-colors`}
        >
          <Cog className="w-4 h-4" />
          Security
        </button>
      </nav>
    </div>
  );
}
