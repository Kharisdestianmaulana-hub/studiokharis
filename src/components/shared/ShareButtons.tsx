"use client";

import React, { useState } from "react";
import { FaWhatsapp, FaInstagram, FaTiktok, FaLink } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // Fallback to window.location.href if url is not provided or relative
  const getFullUrl = () => {
    if (typeof window !== "undefined") {
      return url.startsWith("http") ? url : `${window.location.origin}${url}`;
    }
    return url;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getFullUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="w-4 h-4" />,
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + getFullUrl())}`,
      color: "hover:text-[#25D366] hover:bg-[#25D366]/10",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="w-4 h-4" />,
      href: `https://www.instagram.com/`, // Instagram doesn't have a direct share link via URL, just linking to IG
      color: "hover:text-[#E1306C] hover:bg-[#E1306C]/10",
    },
    {
      name: "TikTok",
      icon: <FaTiktok className="w-4 h-4" />,
      href: `https://www.tiktok.com/`, // Same for TikTok
      color: "hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10",
    },
  ];

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted mr-2 font-medium">Share to:</span>
        {shareLinks.map((link) => (
          <Tooltip key={link.name}>
            <TooltipTrigger asChild>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-8 h-8 rounded-full bg-secondary/20 text-muted transition-colors ${link.color}`}
              >
                {link.icon}
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share on {link.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleCopy}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/20 text-muted hover:text-foreground hover:bg-secondary/40 transition-colors ml-1"
            >
              <FaLink className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{copied ? "Copied!" : "Copy Link"}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
