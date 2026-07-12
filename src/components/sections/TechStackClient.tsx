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
      className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl bg-surface border border-border hover:border-accent/50 transition-all duration-300 cursor-pointer"
    >
      {/* Glow Effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl"
        style={{ backgroundColor: color }}
      />
      
      {/* Icon & Ring Container */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        <CircularProgress proficiency={tech.proficiency} color={color} />
        
        {/* Central Icon */}
        <div 
          className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-background border border-border shadow-inner group-hover:scale-110 transition-transform duration-500"
          style={{ color: color === "#000000" ? "var(--color-primary-text)" : color }} // Adjust black icons for dark mode
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {/* Tech Info */}
      <div className="text-center z-10">
        <h3 className="font-bold text-foreground mb-1 group-hover:text-accent transition-colors">{tech.name}</h3>
        <div className="text-sm font-mono text-muted-foreground flex items-center justify-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
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
      <div className="flex flex-col gap-16 mt-8">
        {techStackData.map((category) => (
          <div key={category.category} className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <h4 className="text-xl md:text-2xl font-bold tracking-widest uppercase text-foreground">
                {category.category}
              </h4>
              <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {category.items.map((tech, i) => (
                <TechNode key={tech.name} tech={tech} index={i} onClick={() => setSelectedTech(tech)} />
              ))}
            </div>
          </div>
        ))}
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
                className="relative w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col"
              >
                <button 
                  onClick={() => setSelectedTech(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-background/50 hover:bg-background border border-border transition-colors text-muted-foreground hover:text-foreground z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className="flex flex-col items-center justify-center p-8 bg-background/50 border-b border-border relative overflow-hidden">
                  <div 
                    className="absolute inset-0 opacity-10 blur-3xl"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <div 
                    className="relative z-10 w-20 h-20 mb-4 flex items-center justify-center rounded-2xl bg-background border border-border shadow-sm"
                    style={{ color: selectedColor === "#000000" ? "var(--color-primary-text)" : selectedColor }}
                  >
                    <SelectedIcon className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground relative z-10">{selectedTech.name}</h2>
                  <p className="text-muted-foreground mt-1 relative z-10">Projects built using this technology</p>
                </div>

                {/* Modal Body / Projects List */}
                <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                  {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {filteredProjects.map((project) => (
                        <Link 
                          key={project.id} 
                          href={`/projects/${project.id}`}
                          className="group flex flex-col overflow-hidden rounded-xl bg-background border border-border hover:border-accent/50 transition-colors"
                        >
                          <div className="relative aspect-video w-full overflow-hidden bg-muted">
                            {project.thumbnail ? (
                              <Image 
                                src={project.thumbnail} 
                                alt={project.title} 
                                fill 
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-secondary/10">
                                <Code2 className="w-8 h-8 text-muted-foreground" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                            <h4 className="font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                              {project.title}
                            </h4>
                            <div className="flex items-center text-xs text-accent font-medium gap-1">
                              View Project <ExternalLink className="w-3 h-3" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 text-muted-foreground">
                        <Code2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">No projects found</h3>
                      <p className="text-muted-foreground max-w-sm">
                        There are currently no public projects listed that use {selectedTech.name}.
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
