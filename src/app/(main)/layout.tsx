import * as React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { Footer } from "@/components/layout/Footer";
import { MusicPlayer } from "@/components/layout/MusicPlayer";
import { BackToTop } from "@/components/layout/BackToTop";
import { MainContainer } from "@/components/layout/MainContainer";
import { getProfileData } from "@/data/profile";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SettingsProvider } from "@/providers/SettingsProvider";
import { TourProvider } from "@/providers/TourProvider";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profileData = await getProfileData();
  
  return (
    <SettingsProvider>
      <TooltipProvider delayDuration={0}>
        <TourProvider>
          <div className="flex min-h-screen w-full overflow-x-clip">
            <Sidebar profileData={profileData} />
            <div className="flex flex-col flex-1 min-w-0">
              <TopNav profileData={profileData} />
              <MainContainer>
                {children}
              </MainContainer>
              <Footer />
            </div>
          </div>
          <MusicPlayer />
          <BackToTop />
        </TourProvider>
      </TooltipProvider>
    </SettingsProvider>
  );
}
