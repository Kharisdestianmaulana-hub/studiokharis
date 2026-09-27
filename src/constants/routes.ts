import {
  Home,
  User,
  Briefcase,
  Code2,
  BookOpen,
  Layers,
  Award,
  Activity,
  Mail,
  Settings,
  MessageSquare,
  Map,
  Flag
} from "lucide-react";

export const NAVIGATION_ROUTES = [
  {
    name: "Home",
    dictKey: "home" as const,
    href: "/",
    icon: Home,
  },
  {
    name: "Projects",
    dictKey: "projects" as const,
    href: "/projects",
    icon: Code2,
  },
  {
    name: "Experience",
    dictKey: "experience" as const,
    href: "/experience",
    icon: Briefcase,
  },
  {
    name: "Tech Stack",
    dictKey: "techStack" as const,
    href: "/tech-stack",
    icon: Layers,
  },
  {
    name: "Articles",
    dictKey: "articles" as const,
    href: "/articles",
    icon: BookOpen,
  },
  {
    name: "Visitor Map",
    dictKey: "visitorMap" as const,
    href: "/globe",
    icon: Map,
  },
  {
    name: "Guestbook",
    dictKey: "guestbook" as const,
    href: "/guestbook",
    icon: MessageSquare,
  },
  {
    name: "Manifesto",
    dictKey: "manifesto" as const,
    href: "/manifesto",
    icon: Flag,
  },
  {
    name: "Timeline",
    dictKey: "timeline" as const,
    href: "/timeline",
    icon: Activity,
  },
  {
    name: "Contact",
    dictKey: "contact" as const,
    href: "/contact",
    icon: Mail,
  },
];

export const BOTTOM_ROUTES = [
  {
    name: "Settings",
    dictKey: "settings" as const,
    href: "/settings",
    icon: Settings,
  },
];
