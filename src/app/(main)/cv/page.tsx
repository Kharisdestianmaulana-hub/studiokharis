import * as React from "react";
import { getProfileData } from "@/data/profile";
import { CvClient } from "./CvClient";
import { getDictionary } from "@/lib/i18n";

export const metadata = {
  title: "Curriculum Vitae - Kharis",
  description: "View and download my professional resume.",
};

export default async function CvPage() {
  const profileData = await getProfileData();
  const dict = await getDictionary();

  return (
    <div className="w-full min-h-screen py-12 md:py-24 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Brutalist Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-[3px] border-foreground pb-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase">
              Curriculum<br/>Vitae
            </h1>
            <p className="text-foreground font-bold tracking-widest uppercase text-xs md:text-sm mt-4">
              TL;DR: {profileData.role.toUpperCase()} • {profileData.location.toUpperCase()}
            </p>
          </div>
          
          <div className="mt-8 md:mt-0">
            <div className="bg-foreground text-background font-mono text-xs font-bold px-4 py-2 uppercase tracking-widest inline-block border-[3px] border-foreground">
              {dict.cv.status.split(":")[0].toUpperCase()}: {profileData.availability.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Client Component for Actions and Viewer */}
        <CvClient 
          resumeUrl={profileData.resumeUrl} 
          resumeViewUrl={profileData.resumeViewUrl} 
        />
      </div>
    </div>
  );
}
