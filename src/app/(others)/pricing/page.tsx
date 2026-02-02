import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col md:mt-36 mt-24 justify-center w-full gap-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-3xl font-medium">
          Unlock more with our exclusive offers
        </p>
        <p className="md:text-3xl text-2xl font-medium flex items-center gap-1 text-muted-foreground">
          Get started for{" "}
          <span className="flex items-center justify-between px-3 rounded-lg bg-primary text-white">
            FREE
          </span>
        </p>
      </div>

      <div className="flex mt-4 w-full">
        <div className="flex w-full md:flex-row flex-col md:justify-center md:items-end items-center gap-6 ">
          <div className="w-80 bg-card border px-8 py-10 rounded-2xl mx-1">
            <p className="font-semibold text-3xl">Basic</p>
            <h1 className="text-3xl font-semibold mt-1">
              $0
              <span className="text-muted-foreground text-sm font-normal">
                /lifetime
              </span>
            </h1>

            <p className="text-muted-foreground text-xs">
              * No credit card required
            </p>
            <ul className="list-none text-muted-foreground text-sm mt-6 space-y-2">
              <li className="flex items-center gap-2">
                <Check size={14} />
                <p>Unlimited links</p>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} />
                <p>40+ social media</p>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} />
                <p>Profile Customization</p>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} />
                <p>Basic Theme Templates</p>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} />
                <p>Link Articles</p>
              </li>
              <li className="flex items-center gap-2">
                <Star size={14} className="text-[#FFD700]" />
                <p>Basic Analytics</p>
              </li>
            </ul>
            <Button
              type="button"
              size={"lg"}
              className="text-sm uppercase w-full py-2 font-medium mt-7 transition-all cursor-pointer rounded-lg"
            >
              Get Started
            </Button>
          </div>

          <div className="w-80 bg-card relative border border-primary px-8 py-10 rounded-2xl mx-1">
            <p className="absolute px-3 text-sm -top-3.5 right-3.5 py-1 bg-primary rounded-full">
              Most Popular
            </p>
            <p className="font-semibold text-3xl pt-2">Premium</p>
            <h1 className="text-3xl font-semibold">
              $5.99
              <span className="text-sm text-muted-foreground font-normal">
                /lifetime
              </span>
            </h1>
            <ul className="list-none text-sm mt-6 space-y-2">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-primary" />
                <p>Everything in Basic</p>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-primary" />
                <p>Animated Avatar</p>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-primary" />
                <p>Collect Emails</p>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-primary" />
                <p>Embed Spotify Links</p>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-primary" />
                <p>Profile Layouts</p>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-primary" />
                <p>Better SEO</p>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-primary" />
                <p>Advance Customization</p>
              </li>
              <li className="flex items-center gap-2">
                <Star size={14} className="text-[#FFD700]" />
                <p>Detailed Analytics</p>
              </li>
              <li className="flex items-center gap-2">
                <Star size={14} className="text-[#FFD700]" />
                <p>Custom Domain</p>
              </li>
              <li className="flex items-center gap-2">
                <Star size={14} className="text-[#FFD700]" />
                <p>Hide Unilink Branding</p>
              </li>
            </ul>
            <Button
              type="button"
              size={"lg"}
              variant={"gradient"}
              className="text-sm uppercase w-full py-2 rounded-lg font-medium mt-7 transition-all cursor-pointer"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
