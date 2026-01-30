"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { PanelLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

interface SidebarContextValue {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  isMobile: boolean;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebarContext() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded, isMobile }}>
      {children}
    </SidebarContext.Provider>
  );
}

function Sidebar({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <aside className={cn("relative", className)} {...props}>
      {children}
    </aside>
  );
}

function SidebarContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { expanded, setExpanded, isMobile } = useSidebarContext();

  if (isMobile) {
    return (
      <Sheet open={expanded} onOpenChange={(open) => setExpanded(open)}>
        <SheetContent
          side="left"
          className={cn("w-70 p-0", className)}
          {...props}
        >
          {children}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className={cn(
        "fixed top-0 left-0 bottom-0 z-30 w-64 border-r transition-transform duration-300 ease-in-out",
        expanded ? "translate-x-0" : "-translate-x-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function SidebarInset({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { expanded } = useSidebarContext();

  return (
    <div
      className={cn(
        "w-full transition-[margin] duration-300 ease-in-out",
        expanded ? "ml-64" : "ml-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function SidebarRail() {
  const { expanded, setExpanded } = useSidebarContext();

  return (
    <div
      className={cn(
        "fixed top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ease-in-out",
        expanded ? "left-64 -ml-3" : "left-0 ml-3",
      )}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="h-12 w-6 border rounded-full cursor-pointer shadow-sm flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-sidebar" />
      </div>
    </div>
  );
}

export {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarRail,
  useSidebarContext as useSidebar,
};
