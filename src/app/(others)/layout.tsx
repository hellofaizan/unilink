import Navbar from "@/components/navbar";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex justify-center bg-background">
      <Navbar />
      {children}
    </div>
  );
}
