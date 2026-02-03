"use client";

import React, { useState } from "react";
import type { User } from "@prisma/client";
import SettingsNav from "./nav/settings-nav";
import SettingsContent from "./nav/settings-content";

interface SettingsPageClientProps {
  user: User | null;
}

export default function SettingsPageClient({ user }: SettingsPageClientProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [currentUser, setCurrentUser] = useState<User | null>(user);

  const handleTabChange = (tab: string | ((prevState: string) => string)) => {
    const newTab = typeof tab === "function" ? tab(activeTab) : tab;
    setActiveTab(newTab);
  };

  return (
    <div className="md:p-8 max-w-300 mx-auto">
      <div className="flex flex-col gap-1 5 mb-5">
        <p className="text-2xl font-medium">Profile Settings</p>
        <p className="text-muted-foreground">
          Manage your account details, security and connected services
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <SettingsNav activeTab={activeTab} onTabChange={handleTabChange} />
        <SettingsContent
          user={currentUser}
          activeTab={activeTab}
          onUserChange={setCurrentUser}
        />
      </div>
    </div>
  );
}
