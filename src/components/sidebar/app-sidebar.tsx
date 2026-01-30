"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Settings,
  BarChart,
  Key,
  LogOut,
  CreditCard,
  Menu,
  Lock,
  MessageCircle,
  X,
  Puzzle,
  LinkIcon,
  Heart,
  ChartColumn,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
  useSidebar,
} from "../ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Links",
    icon: LinkIcon,
    href: "/dashboard/links",
  },
  {
    label: "Socials",
    icon: Heart,
    href: "/dashboard/socials",
  },
  {
    label: "Ananlytics",
    icon: ChartColumn,
    href: "/dashboard/analytics",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export function AppSidebar({ ...props }) {
  const path = usePathname();
  const { setExpanded, isMobile } = useSidebar();
  const role = props.user.role;

  const handleJoinDiscord = () => {
    window.open("https://dub.sh/unilinkdc", "_blank");
  };

  return (
    <>
      <Sidebar {...props}>
        <SidebarContent className="flex flex-col h-full border">
          <div className="border-b max-h-32 px-6 py-6 flex items-center justify-between">
            <Link href="/dashboard">
              <div className="flex items-cente">
                <Image
                  src={"/logos/banner.svg"}
                  alt="Unilink Logo"
                  className="w-52"
                  height={0}
                  width={0}
                  priority
                />
              </div>
            </Link>
            {isMobile && (
              <Button
                variant={"ghost"}
                size={"icon"}
                className="ml-2"
                onClick={() => setExpanded(false)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            )}
          </div>

          <div className="flex-1 pl-3 py-4">
            <nav className="space-y-1 5">
              {role === "ADMIN" && (
                <Link
                  href={"/dashboard/admin"}
                  className={cn(
                    "flex items-center gap-x2=-3 text-sm py-2.5 px-3 rounded-lg relative transition-all",
                    path === "/dashboard/admin"
                      ? "text-sidebar-foreground bg-muted"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                  prefetch={false}
                >
                  <Lock className="h-5 w-5" />
                  <span className="font-medium">Admin</span>
                  {path === "/dashboard/admin" && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-l-full" />
                  )}
                </Link>
              )}

              {routes.map((route) => {
                const isActive = path === route.href;
                console.log(isActive, path)
                return (
                  <Link
                    key={route.href || route.label}
                    href={route.href || ""}
                    className={cn(
                      "flex items-center gap-x-3 text-sm py-2.5 px-3 rounded-lg relative transition-all",
                      isActive
                        ? "text-sidebar-foreground bg-muted"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                    prefetch={false}
                  >
                    <route.icon
                      className={cn(
                        "h-5 w-5",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                    />
                    <span className="font-medium">{route.label}</span>
                    {isActive && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-l-full" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto border-t border">
            <button
              onClick={handleJoinDiscord}
              className="flex items-center gap-x-3 text-sm py-3 px-6 w-full hover:bg-muted hover:text-muted-foreground transition-all"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">Join Discord</span>
            </button>

            <button
              onClick={() => signOut({ callbackUrl: "/dashboard" })}
              className="flex items-center gap-x-3 text-sm py-3 px-6 w-full hover:bg-muted hover:text-muted-foreground transition-all"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Log out</span>
            </button>
          </div>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
