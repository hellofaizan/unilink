import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon, Loader, TriangleAlert } from "lucide-react";
import React, { useState } from "react";
import { FormSuccess } from "./formsuccess";
import { signup } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import RegisterUser from "@/action/register";

type formValues = z.infer<typeof signup>;

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    getValues,
  } = useForm<formValues>({
    resolver: zodResolver(signup),
    mode: "onChange",
  });

  const onSubmit = async (data: formValues) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const res = await RegisterUser({ data });
      if (res.error) {
        setError(res.error || "An error occurred");
      } else {
        setSuccess(res.success || "User has been registered");
        reset();
      }
    } catch (error) {
      setError("AN unexpected error occured");
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const formData = getValues();
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    onSubmit(formData);
  };

  const togglePassword = () => {
    setVisiblePassword((prev) => !prev);
  };

  return (
    <form
      className="mt-4 flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)(e);
      }}
    >
      <div>
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <Input
            id="name"
            placeholder="John Doe"
            className={cn("mt-1 border", errors.email && "border-destructive")}
            required
            {...register("name")}
          />
          {errors.name && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-0.2"
                    variant="ghost"
                    size="icon-sm"
                  >
                    <TriangleAlert className="h-4 w-4 text-destructive" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="px-3 py-1 rounded-md bg-muted border">
                  {errors.name.message}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email address</Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="name@example.com"
            className={cn("mt-1 border", errors.email && "border-destructive")}
            required
          />
          {errors.email && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-0.2"
                    variant="ghost"
                    size="icon-sm"
                  >
                    <TriangleAlert className="h-4 w-4 text-destructive" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="px-3 py-1 rounded-md bg-muted border">
                  {errors.email.message}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={visiblePassword ? "text" : "password"}
            className={cn(
              "mt-1 border",
              errors.password && "border-destructive",
            )}
            required
            placeholder="your password"
            {...register("password")}
          />
          <div className="flex items-center absolute right-1 bottom-1/2 translate-y-1/2">
            <button
              type="button"
              onClick={togglePassword}
              className="text-muted-foreground hover:text-foreground cursor-pointer mr-1"
            >
              {visiblePassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
            {errors.password && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      className="cursor-pointer rounded-md p-0.2 z-10"
                      variant="ghost"
                      size="icon-sm"
                    >
                      <TriangleAlert className="h-4 w-4 text-destructive" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="px-3 py-1 rounded-md bg-muted border">
                    {errors.password.message}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>

      <Button
        className="flex gap-1 text-white cursor-pointer"
        type="submit"
        onClick={handleButtonClick}
        disabled={loading}
      >
        {loading && <Loader className="animate-spin" size={15} />}
        Register
      </Button>

      {error && (
        <div
          className="relative w-full rounded-md border border-red-600 bg-red-200 px-3 py-2 text-gray-900 dark:border-red-700/40 dark:bg-red-600/20 dark:text-gray-300"
          role="alert"
        >
          <span className="flex items-center gap-1">
            <TriangleAlert
              className="text-gray-900 dark:text-gray-300"
              size={16}
            />{" "}
            {error}
          </span>
        </div>
      )}

      {success && <FormSuccess message={success} />}
    </form>
  );
}
