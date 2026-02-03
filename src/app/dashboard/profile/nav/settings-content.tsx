import { User } from "@prisma/client";
import PersonalDetails from "../components/PersonalDetails";
import GetVerifiedBanner from "@/components/get-verified";
import SecurityDetails from "../components/SecurityDetails";

interface SettingsContentProps {
  user: User | null;
  activeTab?: string;
  onUserChange?: (user: User | null) => void;
}

export default function SettingsContent({
  user,
  activeTab = "profile",
  onUserChange,
}: SettingsContentProps) {
  return (
    <div className="w-full max-w-2xl">
      <div
        className={`transition-all duration-200 gap-6 flex flex-col ${
          activeTab === "profile"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 hidden"
        }`}
      >
        {user?.planStatus === "FREE_PLAN" && <GetVerifiedBanner user={user} />}
        <PersonalDetails user={user} onUserChange={onUserChange} />
      </div>

      <div
        className={`transition-all duration-200 gap-6 flex flex-col ${
          activeTab === "security"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 hidden"
        }`}
      >
        {user?.planStatus === "FREE_PLAN" && <GetVerifiedBanner user={user} />}
        <SecurityDetails user={user} />
      </div>
    </div>
  );
}
