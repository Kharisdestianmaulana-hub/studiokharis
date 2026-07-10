import * as React from "react";
import { getExperiences } from "@/data/experience";
import { ExperienceClient } from "./ExperienceClient";

export async function ExperienceSection() {
  const experienceData = await getExperiences();
  return (
    <section id="experience" className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">Experience</h3>
          <p className="text-muted text-sm md:text-base max-w-xl">
            My professional journey, education, and volunteer work.
          </p>
        </div>

        <ExperienceClient experienceData={experienceData} />
      </div>
    </section>
  );
}
