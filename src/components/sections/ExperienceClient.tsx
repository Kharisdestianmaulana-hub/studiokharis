"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, Award, Users, Heart, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["ALL", "WORK", "EDUCATION", "CERTIFICATION", "INTERNSHIP", "VOLUNTEER"];

export function ExperienceClient({ experienceData }: { experienceData: any[] }) {
  const [activeCategory, setActiveCategory] = React.useState("ALL");

  const filteredData = React.useMemo(() => {
    if (activeCategory === "ALL") return experienceData;
    return experienceData.filter((exp) => exp.type.toUpperCase() === activeCategory);
  }, [experienceData, activeCategory]);

  const getIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case "WORK": return <Briefcase className="w-5 h-5 text-accent" />;
      case "EDUCATION": return <GraduationCap className="w-5 h-5 text-accent" />;
      case "CERTIFICATION": return <Award className="w-5 h-5 text-accent" />;
      case "INTERNSHIP": return <Users className="w-5 h-5 text-accent" />;
      case "VOLUNTEER": return <Heart className="w-5 h-5 text-accent" />;
      default: return <Briefcase className="w-5 h-5 text-accent" />;
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map((category) => {
          const count = category === "ALL" 
            ? experienceData.length 
            : experienceData.filter((exp) => exp.type.toUpperCase() === category).length;
          
          const isActive = activeCategory === category;
          
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-semibold border-2 transition-all duration-200 uppercase tracking-wider rounded-xl",
                isActive 
                  ? "bg-accent border-accent text-white" 
                  : "bg-surface border-border text-secondary-text hover:border-accent/50 hover:text-foreground"
              )}
            >
              {category}
              <span className={cn(
                "px-2 py-0.5 rounded text-xs",
                isActive ? "bg-white/20 text-white" : "bg-secondary/10 text-secondary-text"
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Timeline List */}
      <div className="flex flex-col space-y-12 border-l-2 border-border/60 pl-8 ml-3 md:ml-4 mt-6">
        {filteredData.map((exp: any) => (
          <div key={exp.id} className="relative group animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Timeline Icon */}
            <div className="absolute -left-[49px] md:-left-[57px] w-12 h-12 rounded-full bg-surface border-2 border-accent flex items-center justify-center ring-4 ring-background group-hover:scale-110 transition-transform duration-300">
              {getIcon(exp.type)}
            </div>
            
            {/* Content Card */}
            <div className="flex flex-col gap-3 p-6 rounded-2xl bg-surface border border-border shadow-sm hover:shadow-md transition-all duration-300 -mt-2">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground uppercase tracking-wider">{exp.role}</h3>
                  <div className="text-secondary-text font-medium text-base">{exp.company}</div>
                </div>
                
                <Badge variant="secondary" className="w-fit bg-accent/10 text-accent border border-accent/20">
                  {exp.type}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm font-medium mt-1">
                <div className="bg-secondary/5 text-foreground px-3 py-1.5 border border-border rounded-md">
                  {exp.duration}
                </div>
                {exp.address && (
                  <div className="flex items-center gap-1.5 bg-accent/5 text-accent px-3 py-1.5 border border-accent/20 rounded-md">
                    <MapPin className="w-4 h-4" />
                    <span>{exp.address}</span>
                  </div>
                )}
              </div>

              <p className="text-secondary-text mt-3 text-sm md:text-base leading-relaxed">
                {exp.description}
              </p>
              
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {exp.technologies.map((tech: any) => (
                    <Badge key={tech} variant="outline" className="text-xs bg-background/50 border-border/50">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {filteredData.length === 0 && (
          <div className="text-secondary-text italic p-4">
            No experiences found for this category.
          </div>
        )}
      </div>
    </div>
  );
}
