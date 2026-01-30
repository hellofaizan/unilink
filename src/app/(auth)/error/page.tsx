import React from "react";
import Image from "next/image";

export default function page() {
  return (
    <div className="flex border rounded-xl overflow-hidden flex-col items-center justify-center px-4 py-8 mx-auto h-screen lg:py-0">
      <div className="mb-6">
        <Image
          src="/logos/logo.png"
          alt="Unilink"
          width={140}
          height={31}
          className="object-contain"
          priority
        />
      </div>

      <div className="max-w-md w-full mx-auto rounded-sm md:rounded-lg p-3 md:p-8 shadow-input bg-transparent">
        <h2 className="font-bold w-full text-5xl md:text-6xl text-center">
          Error 🔐
        </h2>
        <p className="text-sm max-w-sm mt-4 text-center">
          Opps! Something went wrong. Please try again later.
        </p>
      </div>
    </div>
  );
}
