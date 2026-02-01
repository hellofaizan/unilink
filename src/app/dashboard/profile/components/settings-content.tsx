"use client";

import { User } from "@prisma/client";
import PersonalDetails from "./PersonalDetails";

interface SettingsContentProps {
  user: User | null;
  activeTab?: string;
}

export default function SettingsContent({
  user,
  activeTab = "profile",
}: SettingsContentProps) {
  return (
    <div className="w-full max-w-2xl">
      <div
        className={`transition-all duration-200 ${
          activeTab === "profile"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 hidden"
        }`}
      >
        <PersonalDetails user={user} />
      </div>

      <div
        className={`transition-all duration-200 ${
          activeTab === "security"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 hidden"
        }`}
      >
        change pasword
      </div>
    </div>
  );
}
