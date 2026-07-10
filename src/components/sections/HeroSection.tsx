import * as React from "react";
import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaGlobe, FaEnvelope, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { getProfileData } from "@/data/profile";
import { getSocialLinks } from "@/data/socials";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export async function HeroSection({ hideButtons = false }: { hideButtons?: boolean } = {}) {
  const profileData = await getProfileData();
  const socialsData = await getSocialLinks();
  return (
    <section className="flex flex-col items-start gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <Avatar className="h-24 w-24 md:h-32 md:w-32 border-2 border-border shadow-sm">
          <AvatarImage src={profileData.avatarUrl} alt={profileData.name} />
          <AvatarFallback className="text-2xl">{profileData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <Badge variant="secondary" className="w-fit text-accent bg-accent/10 hover:bg-accent/20 border-accent/20">
            <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse"></span>
            {profileData.availability}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            {profileData.name}
          </h1>
        </div>
      </div>

      <div className="max-w-2xl">
        <p className="text-lg md:text-xl text-secondary-text leading-relaxed">
          {profileData.tagline} {profileData.shortDescription}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {!hideButtons && (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="lg" className="rounded-xl h-12 px-6" asChild>
                  <Link href="/projects" className="flex items-center gap-2">
                    View Projects
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>View all my projects</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="lg" variant="outline" className="rounded-xl h-12 px-6" asChild>
                  <Link href={profileData.resumeUrl} target="_blank" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Resume
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download my resume</TooltipContent>
            </Tooltip>
          </>
        )}
        <div className="flex items-center gap-2 ml-2">
          {socialsData.map((social: any) => {
            let Icon = FaGlobe;
            const p = social.platformName.toLowerCase();
            if (p.includes("github")) Icon = FaGithub;
            else if (p.includes("linkedin")) Icon = FaLinkedin;
            else if (p.includes("twitter") || p.includes("x")) Icon = FaTwitter;
            else if (p.includes("instagram")) Icon = FaInstagram;
            else if (p.includes("mail") || p.includes("email")) Icon = FaEnvelope;
            else if (p.includes("whatsapp") || p.includes("wa")) Icon = FaWhatsapp;
            else if (p.includes("phone") || p.includes("call") || p.includes("tel")) Icon = FaPhoneAlt;
            
            return (
              <Tooltip key={social.name}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild className="rounded-xl text-muted hover:text-foreground">
                    <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                      <Icon className="w-5 h-5" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{social.name}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </section>
  );
}
