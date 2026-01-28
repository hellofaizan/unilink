import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideCircleQuestionMark } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex justify-center mt-32 gap-2">
      <div className="flex items-start flex-col w-135 gap-2">
        <p className="flex items-center gap-1 text-4xl font-bold">
          <LucideCircleQuestionMark size={36} />
          <span>Help</span>
        </p>
        <p className="text-muted-foreground">
          We are available to assist you with any questions or issues you may
          have. We also love to hear your feedback and suggestions.
        </p>

        <Link href={"/faq"} className="w-full ">
          <div
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-20 rounded-lg mt-3 flex items-center text-3xl",
            )}
          >
            <span>FAQ</span>
          </div>
        </Link>

        <Link
          href={"https://dub.sh/unilinkdc"}
          target="_blank"
          className="w-full "
        >
          <div
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-20 rounded-lg mt-3 flex items-center text-3xl bg-[#6366f1] hover:bg-[#585aef]",
            )}
          >
            <span>Discord Server</span>
          </div>
        </Link>

        <Link href={"mailto:faizancurious@gmail.com"} className="w-full ">
          <div
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-20 rounded-lg mt-3 flex items-center text-3xl bg-[#ef4f4f] hover:bg-[#eb3e3e]",
            )}
          >
            <span>Email Support</span>
          </div>
        </Link>

        <Link href={"/terms"} className="w-full ">
          <div
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-20 rounded-lg mt-3 flex items-center text-3xl bg-[#10b981] hover:bg-[#16a575]",
            )}
          >
            <span>Terms of Service</span>
          </div>
        </Link>

        <Link href={"/privacy"} className="w-full ">
          <div
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-20 rounded-lg mt-3 flex items-center text-3xl bg-[#a855f7] hover:bg-[#9e41f5]",
            )}
          >
            <span>Privacy Policy</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
