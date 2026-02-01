import React from "react";
import { User } from "@prisma/client";
import z from "zod";
import GetVerifiedBanner from "@/components/get-verified";

const updateData = z.object({
  name: z.string().min(1, "Name is required").max(25, {
    message: "Name must be at most 25 characters",
  }),
  email: z.email("Invalid email address"),
});

type formValues = z.infer<typeof updateData>;

interface PersonalDataProps {
  user: User | null;
}

export default function PersonalDetails({ user }: PersonalDataProps) {
  return (
    <div className="">
      <GetVerifiedBanner user={user} />{" "}
    </div>
  );
}
