import { User } from "@prisma/client";
import GeneralSettings from "./generalSettings";

interface PersonalDataProps {
  user: User | null;
  onUserChange?: (user: User | null) => void;
}

export default function PersonalDetails({
  user,
  onUserChange,
}: PersonalDataProps) {
  return (
    <div className="flex flex-col gap-6">
      <GeneralSettings user={user} onUserChange={onUserChange} />
    </div>
  );
}
