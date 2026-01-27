import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full px-4 sm:px-0">
        <div className="flex flex-col w-full max-w-100 mx-auto">
          {/* Logo Container */}
          <div className="flex items-center text-primary text-4xl font-medium justify-center">
            unilink
            <Image
              src={"/logos/logo_blue.png"}
              alt="unilink logo"
              width={30}
              height={30}
              className="object-contain text-primary"
              priority
              unoptimized
            />
          </div>
          <div className="rounded-xl overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
}
