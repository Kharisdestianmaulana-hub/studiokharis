import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";

export interface HoverLinkData {
  id: string;
  title: string;
  description: string;
  type: string;
  url: string;
  imageUrl?: string;
}

interface HoverLinkProps {
  children: React.ReactNode;
  data: HoverLinkData;
}

export function HoverLink({ children, data }: HoverLinkProps) {
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Link 
          href={data.url}
          className="relative inline-block font-semibold text-foreground hover:text-accent transition-colors duration-200 cursor-pointer decoration-accent/30 hover:decoration-accent decoration-2 underline-offset-4 border-b border-dashed border-muted-foreground/50 hover:border-accent"
        >
          {children}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent 
        className="w-80 p-0 overflow-hidden bg-surface/95 backdrop-blur-xl border-border shadow-xl animate-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
        sideOffset={8}
      >
        {data.imageUrl ? (
          <div className="relative w-full h-32 bg-secondary/20">
            <Image 
              src={data.imageUrl} 
              alt={data.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="relative w-full h-12 bg-gradient-to-r from-accent/20 to-secondary/10" />
        )}
        
        <div className="p-4 flex flex-col gap-2 relative">
          {/* Badge over image or header */}
          <div className="absolute -top-4 right-4">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm border border-border shadow-sm text-[10px] font-medium tracking-wider uppercase">
              {data.type}
            </Badge>
          </div>
          
          <h4 className="text-base font-bold text-foreground leading-none mt-2">
            {data.title}
          </h4>
          
          <p className="text-sm text-secondary-text line-clamp-3 leading-relaxed mt-1">
            {data.description}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
