import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/server/auth";
import { userData } from "@/server/userdata";
import { SessionProvider } from "next-auth/react";
import React, { Suspense } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  // const user = await userData(session?.user.id as string);

  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AppSidebar user={session?.user} />
          <SidebarInset className="flex min-h-screen">
            <main className="flex-1 min-h-screen px-4 py-6 md:px-8">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}
