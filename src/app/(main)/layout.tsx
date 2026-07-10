import * as React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { Footer } from "@/components/layout/Footer";
import { getProfileData } from "@/data/profile";
import { TooltipProvider } from "@/components/ui/tooltip";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profileData = await getProfileData();
  
  return (
    <TooltipProvider delayDuration={1500}>
      <div className="flex min-h-screen w-full">
        <Sidebar profileData={profileData} />
        <div className="flex flex-col flex-1 min-w-0">
          <TopNav profileData={profileData} />
          <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 py-6 md:py-8">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </TooltipProvider>
  );
}
