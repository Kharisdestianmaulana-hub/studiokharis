import * as React from "react";
import { getExperiences } from "@/data/experience";
import { ExperienceClient } from "./ExperienceClient";
import { getDictionary } from "@/lib/i18n";

export async function ExperienceSection() {
  const experienceData = await getExperiences();
  const dict = await getDictionary();
  return (
    <section id="experience" className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 border-b-[3px] border-foreground pb-4">
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase">{dict.experience.title}</h3>
          <p className="text-foreground font-bold tracking-widest uppercase text-xs md:text-sm">
            {dict.experience.subtitle}
          </p>
        </div>

        <ExperienceClient experienceData={experienceData} />
      </div>
    </section>
  );
}
