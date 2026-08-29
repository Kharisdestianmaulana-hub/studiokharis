import * as React from "react";
import { TimelineClient } from "./TimelineClient";

interface TimelineSectionProps {
  limit?: number;
  repoNames?: string[];
  showTitle?: boolean;
}

export async function TimelineSection({ 
  limit, 
  repoNames,
  showTitle = true 
}: TimelineSectionProps) {
  return (
    <section id="timeline" className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
      <div className="flex flex-col gap-8">
        {showTitle && (
          <div className="flex flex-col gap-2 border-b-[3px] border-foreground pb-4">
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase">GitHub Timeline</h3>
            <p className="text-foreground font-bold tracking-widest uppercase text-xs md:text-sm">
              MY LATEST REPOSITORIES AND COMMITS FROM GITHUB.
            </p>
          </div>
        )}

        <TimelineClient limit={limit} repoNames={repoNames} />
      </div>
    </section>
  );
}
