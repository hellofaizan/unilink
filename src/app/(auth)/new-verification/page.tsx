import React, { Suspense } from "react";
import VerificationForm from "./components/form";

export default function VerificationPage() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="mx-auto border rounded-xl overflow-hidden flex flex-col items-center justify-center px-4 py-8 lg:py-0">
            <div className="mx-auto w-full max-w-md rounded-sm bg-transparent p-3 shadow-input md:rounded-lg md:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Get Verified</h2>
              </div>
              <p className="mt-2 max-w-sm text-sm">Loading verification...</p>
            </div>
          </div>
        }
      >
        <VerificationForm />
      </Suspense>
    </div>
  );
}
