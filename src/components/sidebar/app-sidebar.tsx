"use client";

import {
  LayoutDashboard,
  LogOut,
  Menu,
  Lock,
  MessageCircle,
  X,
  LinkIcon,
  Heart,
  ChartColumn,
  ChevronRight,
  UserPen,
  Mail,
} from "lucide-react";
import { Sidebar, SidebarContent, useSidebar } from "../ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Suspense } from "react";

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
  // {
  //   label: "Emails",
  //   icon: Mail,
  //   href: "/dashboard/emails",
  // },
  // {
  //   label: "Ananlytics",
  //   icon: ChartColumn,
  //   href: "/dashboard/analytics",
  // },
  {
    label: "Profile",
    icon: UserPen,
    href: "/dashboard/profile",
  },
];

export function AppSidebar({ ...props }) {
  const path = usePathname();
  const { setExpanded, isMobile } = useSidebar();
  const user = props.user;
  const role = user.role;

  const handleJoinDiscord = () => {
    window.open("https://dub.sh/unilinkdc", "_blank");
  };

  return (
    <>
      <Sidebar {...props}>
        <SidebarContent className="flex flex-col h-full border">
          <div className="border-b p-4 flex items-center justify-betwee h-28">
            <Link href="/dashboard">
              <div className="flex items-center">
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
            <nav className="space-y-1 5 transition-all">
              {role === "ADMIN" && (
                <Link
                  href={"/dashboard/admin"}
                  className={cn(
                    "flex items-center gap-x-3 text-sm py-2.5 px-3 rounded-lg relative transition-all",
                    path === "/dashboard/admin"
                      ? "text-sidebar-foreground bg-border"
                      : "text-muted-foreground hover:bg-border",
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
                return (
                  <Link
                    key={route.href || route.label}
                    href={route.href || ""}
                    className={cn(
                      "flex items-center gap-x-3 text-sm py-2.5 px-3 rounded-lg relative transition-all",
                      isActive
                        ? "text-sidebar-foreground bg-border"
                        : "text-muted-foreground hover:bg-border",
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

          <div className="mt-auto border-t rounded-lg overflow-hidden">
            <button
              onClick={handleJoinDiscord}
              className="cursor-pointer h-14 flex items-center gap-x-3 text-sm py-3 px-6 w-full hover:bg-muted hover:text-muted-foreground transition-all"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">Join Discord</span>
            </button>

            <button
              onClick={() => signOut({ callbackUrl: "/dashboard" })}
              className="cursor-pointer h-14 flex items-center gap-x-3 text-sm py-3 px-6 w-full hover:bg-muted hover:text-muted-foreground transition-all"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Log out</span>
            </button>

            <Link
              href={`/${user.username as string}`}
              target="_blank"
              className="flex shrink-0 items-center space-x-3 p-2 hover:bg-muted hover:text-muted-foreground transition-all"
            >
              <Avatar className="h-auto w-auto">
                <Suspense fallback={<AvatarFallback>UNI</AvatarFallback>}>
                  <Image
                    alt={user?.name as string}
                    src={user?.image as string}
                    className="rounded-full border"
                    width={40}
                    height={40}
                  />
                </Suspense>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.name as string}
                </p>
                <p className="text-xs text-muted-foregroun">{user.email}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </div>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
