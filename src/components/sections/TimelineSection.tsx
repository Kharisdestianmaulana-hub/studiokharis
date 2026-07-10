import * as React from "react";
import { getChangelogs } from "@/data/timeline";
import { TimelineClient } from "./TimelineClient";

export async function TimelineSection() {
  const changelogs = await getChangelogs();

  return (
    <section id="timeline" className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">Changelogs</h3>
          <p className="text-muted text-sm md:text-base max-w-xl">
            Release notes & version history.
          </p>
        </div>

        <TimelineClient changelogData={changelogs} />
      </div>
    </section>
  );
}
