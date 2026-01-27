import React, { Suspense } from "react";
import { Loader } from "lucide-react";
import Link from "next/link";
import GoogleButton from "../components/google";
import LoginForm from "../components/LoginForm";

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
        <div className="bg-card py-8 px-4 shadow-sm rounded-lg sm:px-10">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-foreground">
              Welcome back
            </h2>
          </div>
          <LoginForm />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          <GoogleButton />

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-foreground hover:underline hover:text-foreground/90 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
