"use client";

import { Loader } from "lucide-react";
import Image from "next/image";
import React, { Suspense } from "react";
import RegisterForm from "../components/RegisterForm";
import GoogleButton from "@/app/(auth)/components/google";
import Link from "next/link";

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <Loader className="animate-spin" />{" "}
        </div>
      }
    >
      <div className="mt-4 border rounded-xl overflow-hidden sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 shadow-sm rounded-lg sm:px-10 bg-card dark:bg-[#1c1c1c]">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold">Create an account</h2>
          </div>

          <RegisterForm />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <GoogleButton />
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-foreground hover:text-foreground/90 font-medium hover:underline"
            >
              Login In
            </Link>
          </p>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
