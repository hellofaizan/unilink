"use client";

import React, { useState, useEffect } from "react";
import { User } from "@prisma/client";
import SettingsNav from "./components/settings-nav";
import SettingsContent from "./components/settings-content";

interface SettingsPageProps {
  user: User | null;
}

export default function SettingsPageClient({ user }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabChange = (tab: string | ((prevState: string) => string)) => {
    const newTab = typeof tab === "function" ? tab(activeTab) : tab;
    setActiveTab(newTab);
  };

  return (
    <div className="md:p-8 max-w-300 mx-auto">
      <div className="flex flex-col gap-1 5 mb-8">
        <p className="text-2xl font-medium">Account Settings</p>
        <p className="text-muted-foreground">
          Manage your account preferences, security and connected services
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <SettingsNav activeTab={activeTab} onTabChange={handleTabChange} />
        <SettingsContent user={user} activeTab={activeTab} />
      </div>
    </div>
  );
}
