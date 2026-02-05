import Navbar from "@/components/navbar";
import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center flex-col">
    <Navbar />
      <div className="min-h-dvh flex items-center justify-center w-full">
        <div className="w-full px-4 sm:px-0">
          <div className="flex flex-col w-full max-w-100 mx-auto">
            {/* Logo Container */}
            <div className="flex items-center text-primary text-4xl font-medium justify-center">
              <Image
                src={"/logos/banner.svg"}
                alt="Unilink Logo"
                className="w-52"
                priority
                height={0}
                width={0}
              />
            </div>
            <div className="rounded-xl overflow-hidden">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
