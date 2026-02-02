import { User } from "@prisma/client";
import z from "zod";
import GetVerifiedBanner from "@/components/get-verified";
import GeneralSettings from "./generalSettings";

interface PersonalDataProps {
  user: User | null;
}

export default function PersonalDetails({ user }: PersonalDataProps) {
  return (
    <div className="flex flex-col gap-6">
      <GeneralSettings user={user} />
    </div>
  );
}
