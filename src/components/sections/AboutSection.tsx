import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getProfileData } from "@/data/profile";
import { RichText } from "@/components/ui/RichText";
import { MapPin, Link as LinkIcon, Mail } from "lucide-react";

export async function AboutSection() {
  const profileData = await getProfileData();
  return (
    <section id="about" className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-bold tracking-tight text-foreground">About Me</h3>
        
        <Card className="bg-surface border-border overflow-hidden rounded-[16px]">
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-6">
              <div className="text-secondary-text leading-relaxed space-y-4 whitespace-pre-wrap">
                <RichText content={profileData.about} />
              </div>
            </div>
            
            <div className="w-full md:w-64 flex flex-col gap-4 p-4 rounded-xl bg-secondary/5 border border-border/50">
              <div className="flex items-center gap-3 text-sm text-secondary-text">
                <MapPin className="w-4 h-4 text-muted" />
                <span>{profileData.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-secondary-text">
                <LinkIcon className="w-4 h-4 text-muted" />
                <a href={`https://${profileData.website}`} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                  {profileData.website}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-secondary-text">
                <Mail className="w-4 h-4 text-muted" />
                <a href={`mailto:${profileData.email}`} className="hover:text-accent transition-colors">
                  {profileData.email}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
