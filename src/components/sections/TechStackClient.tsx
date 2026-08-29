"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaPython, 
  FaJava, FaPhp, FaVuejs, FaAngular, FaDocker, FaAws, FaGithub 
} from "react-icons/fa";
import { 
  SiFlutter, SiTypescript, SiExpress, SiMongodb, SiPostgresql, 
  SiMysql, SiFirebase, SiTailwindcss, SiNextdotjs, SiGodotengine,
  SiDjango, SiFastapi, SiGraphql, SiRedis, SiFigma, SiUnity, SiAppwrite
} from "react-icons/si";
import { TbBrandCSharp, TbBrandAdobeIllustrator, TbBrandAdobePhotoshop } from "react-icons/tb";
import { Code2, X, ExternalLink } from "lucide-react";
import { TechStackCategory, TechStackItem } from "@/data/tech-stack";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

// Any lightweight Project type needed
type ProjectMin = {
  id: string;
  title: string;
  thumbnail: string;
  techStack: string[];
};

import { getTechIcon } from "@/lib/tech-icons";

const CircularProgress = ({ proficiency, color }: { proficiency: number, color: string }) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  // Convert proficiency to stroke-dashoffset (100% = 0, 0% = circumference)
  const strokeDashoffset = circumference - (proficiency / 100) * circumference;

  return (
    <div className="absolute inset-0 flex items-center justify-center -rotate-90">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background track */}
        <circle
          className="text-border/40"
          strokeWidth="6"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        {/* Animated Progress Ring */}
        <motion.circle
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
    </div>
  );
};

const TechNode = ({ tech, index, onClick }: { tech: TechStackItem, index: number, onClick: () => void }) => {
  const { icon: Icon, color } = getTechIcon(tech.name);

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col items-center gap-4 p-6 rounded-none-2xl bg-surface border border-border hover:border-accent/50 transition-all duration-300 cursor-pointer"
    >
      {/* Glow Effect */}
      <div 
        className="absolute inset-0 rounded-none-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl"
        style={{ backgroundColor: color }}
      />
      
      {/* Icon & Ring Container */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        <CircularProgress proficiency={tech.proficiency} color={color} />
        
        {/* Central Icon */}
        <div 
          className="relative z-10 w-12 h-12 flex items-center justify-center rounded-none bg-background border border-border shadow-inner group-hover:scale-110 transition-transform duration-500"
          style={{ color: color === "#000000" ? "var(--color-primary-text)" : color }} // Adjust black icons for dark mode
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {/* Tech Info */}
      <div className="text-center z-10">
        <h3 className="font-bold text-foreground mb-1 group-hover:text-accent transition-colors">{tech.name}</h3>
        <div className="text-sm font-mono text-muted-foreground flex items-center justify-center gap-1">
          <span className="inline-block w-2 h-2 rounded-none" style={{ backgroundColor: color }} />
          {tech.proficiency}%
        </div>
      </div>
    </motion.div>
  );
};

export function TechStackClient({ techStackData, projects = [] }: { techStackData: TechStackCategory[], projects?: ProjectMin[] }) {
  const [selectedTech, setSelectedTech] = React.useState<TechStackItem | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Close modal on escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedTech(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter projects when a tech is selected
  const filteredProjects = React.useMemo(() => {
    if (!selectedTech) return [];
    const techName = selectedTech.name.toLowerCase();
    return projects.filter(p => p.techStack?.some(t => t.toLowerCase() === techName));
  }, [selectedTech, projects]);

  const SelectedIcon = selectedTech ? getTechIcon(selectedTech.name).icon : null;
  const selectedColor = selectedTech ? getTechIcon(selectedTech.name).color : "#000";

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12">
        {/* Left Side: Unified Tech Grid (Periodic Table) */}
        <div className="lg:col-span-5 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 border-[3px] border-foreground bg-foreground gap-[3px]">
          {techStackData.flatMap(c => c.items).map((tech, index) => {
            const { icon: Icon, color } = getTechIcon(tech.name);
            return (
              <motion.div
                key={tech.name}
                onClick={() => setSelectedTech(tech)}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                className="group relative flex items-center justify-center p-4 bg-background hover:bg-foreground hover:text-background transition-colors cursor-pointer aspect-square"
                title={`${tech.name} - ${tech.proficiency}%`}
              >
                <Icon className="w-8 h-8 md:w-10 md:h-10 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" style={{ color: color === "#000000" ? "currentColor" : color }} />
              </motion.div>
            );
          })}
        </div>

        {/* Right Side: Category Text Columns */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 border-[3px] border-foreground bg-foreground gap-[3px]">
          {techStackData.map((category, idx) => {
            const isDark = (idx % 4 === 1) || (idx % 4 === 2); // Checkerboard for 2 columns
            const bgClass = isDark ? "bg-foreground text-background" : "bg-background text-foreground";
            
            return (
              <div key={category.category} className={`flex flex-col p-8 md:p-10 transition-none ${bgClass}`}>
                <div className="flex justify-between items-start mb-12">
                  <span className="text-6xl md:text-7xl font-black tracking-tighter">{String(idx + 1).padStart(2, '0')}</span>
                  <h4 className="text-sm md:text-base font-black tracking-widest uppercase text-right max-w-[140px] leading-tight">
                    {category.category}
                  </h4>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {category.items.map(tech => (
                    <span key={tech.name} className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 border-[2px] border-current opacity-90">
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tech Projects Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedTech && SelectedIcon && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedTech(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-3xl bg-background border-[3px] border-foreground shadow-[12px_12px_0_0_var(--foreground)] overflow-hidden z-10 max-h-[85vh] flex flex-col"
              >
                <button 
                  onClick={() => setSelectedTech(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 px-4 py-2 bg-foreground text-background font-black uppercase tracking-widest border-[3px] border-foreground hover:bg-background hover:text-foreground transition-colors z-20 flex items-center gap-2"
                >
                  CLOSE <X className="w-5 h-5 stroke-[3]" />
                </button>

                {/* Modal Header */}
                <div className="flex flex-col items-center justify-center p-12 bg-background border-b-[3px] border-foreground relative overflow-hidden">
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <div 
                    className="relative z-10 w-24 h-24 mb-6 flex items-center justify-center bg-background border-[3px] border-foreground grayscale"
                  >
                    <SelectedIcon className="w-12 h-12 text-foreground" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter relative z-10">{selectedTech.name}</h2>
                  <p className="text-foreground font-bold tracking-widest uppercase text-xs md:text-sm mt-3 relative z-10">PROJECTS BUILT USING THIS TECHNOLOGY</p>
                </div>

                {/* Modal Body / Projects List */}
                <div className="p-6 md:p-10 overflow-y-auto flex-1 custom-scrollbar bg-background">
                  {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                      {filteredProjects.map((project) => (
                        <Link 
                          key={project.id} 
                          href={`/projects/${project.id}`}
                          className="group flex flex-col overflow-hidden bg-background border-[3px] border-foreground hover:-translate-y-1 transition-transform duration-300"
                        >
                          <div className="relative aspect-[4/3] w-full overflow-hidden bg-foreground border-b-[3px] border-foreground">
                            {project.thumbnail ? (
                              <Image 
                                src={project.thumbnail} 
                                alt={project.title} 
                                fill 
                                className="object-cover transition-all duration-500 grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal transform group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-background">
                                <Code2 className="w-10 h-10 text-foreground" />
                              </div>
                            )}
                          </div>
                          <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                            <h4 className="font-black text-lg md:text-xl text-foreground uppercase tracking-tight line-clamp-2 leading-tight">
                              {project.title}
                            </h4>
                            <div className="flex items-center justify-between w-full">
                              <span className="text-xs font-black uppercase tracking-widest border-[2px] border-foreground px-2 py-1">
                                VIEW PROJECT
                              </span>
                              <ExternalLink className="w-5 h-5 text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={3} />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center border-[3px] border-dashed border-foreground/30">
                      <div className="w-20 h-20 bg-foreground text-background flex items-center justify-center mb-6">
                        <Code2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter text-foreground mb-2">NO PROJECTS FOUND</h3>
                      <p className="text-foreground font-bold uppercase tracking-widest text-xs opacity-70 max-w-sm">
                        THERE ARE CURRENTLY NO PUBLIC PROJECTS LISTED THAT USE {selectedTech.name}.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
