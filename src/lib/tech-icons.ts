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
import { Code2 } from "lucide-react";

// Map technology names from database to react-icons
export const getTechIcon = (name: string) => {
  const normalized = name.toLowerCase().trim();
  switch (true) {
    case normalized.includes("html"): return { icon: FaHtml5, color: "#E34F26" };
    case normalized.includes("css"): return { icon: FaCss3Alt, color: "#1572B6" };
    case normalized.includes("javascript"): return { icon: FaJsSquare, color: "#F7DF1E" };
    case normalized.includes("typescript"): return { icon: SiTypescript, color: "#3178C6" };
    case normalized.includes("react"): return { icon: FaReact, color: "#61DAFB" };
    case normalized.includes("next"): return { icon: SiNextdotjs, color: "#000000" };
    case normalized.includes("vue"): return { icon: FaVuejs, color: "#4FC08D" };
    case normalized.includes("angular"): return { icon: FaAngular, color: "#DD0031" };
    case normalized.includes("tailwind"): return { icon: SiTailwindcss, color: "#06B6D4" };
    case normalized.includes("flutter"): return { icon: SiFlutter, color: "#02569B" };
    case normalized.includes("node"): return { icon: FaNodeJs, color: "#339933" };
    case normalized.includes("express"): return { icon: SiExpress, color: "#000000" };
    case normalized.includes("python"): return { icon: FaPython, color: "#3776AB" };
    case normalized.includes("django"): return { icon: SiDjango, color: "#092E20" };
    case normalized.includes("fastapi"): return { icon: SiFastapi, color: "#009688" };
    case normalized.includes("java") && !normalized.includes("javascript"): return { icon: FaJava, color: "#007396" };
    case normalized.includes("c#"): return { icon: TbBrandCSharp, color: "#239120" };
    case normalized.includes("php"): return { icon: FaPhp, color: "#777BB4" };
    case normalized.includes("mongo"): return { icon: SiMongodb, color: "#47A248" };
    case normalized.includes("postgres"): return { icon: SiPostgresql, color: "#336791" };
    case normalized.includes("mysql"): return { icon: SiMysql, color: "#4479A1" };
    case normalized.includes("firebase"): return { icon: SiFirebase, color: "#FFCA28" };
    case normalized.includes("redis"): return { icon: SiRedis, color: "#DC382D" };
    case normalized.includes("graphql"): return { icon: SiGraphql, color: "#E10098" };
    case normalized.includes("docker"): return { icon: FaDocker, color: "#2496ED" };
    case normalized.includes("aws"): return { icon: FaAws, color: "#232F3E" };
    case normalized.includes("git"): return { icon: FaGithub, color: "#181717" };
    case normalized.includes("gd script") || normalized.includes("godot"): return { icon: SiGodotengine, color: "#478CBF" };
    case normalized.includes("figma"): return { icon: SiFigma, color: "#F24E1E" };
    case normalized.includes("unity"): return { icon: SiUnity, color: "#000000" };
    case normalized.includes("appwrite"): return { icon: SiAppwrite, color: "#FD366E" };
    case normalized.includes("illustrator"): return { icon: TbBrandAdobeIllustrator, color: "#FF9A00" };
    case normalized.includes("photoshop"): return { icon: TbBrandAdobePhotoshop, color: "#31A8FF" };
    default: return { icon: Code2, color: "var(--color-accent)" };
  }
};
