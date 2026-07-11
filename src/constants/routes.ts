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
} from "lucide-react";

export const NAVIGATION_ROUTES = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: Code2,
  },
  {
    name: "Experience",
    href: "/experience",
    icon: Briefcase,
  },
  {
    name: "Tech Stack",
    href: "/tech-stack",
    icon: Layers,
  },
  {
    name: "Articles",
    href: "/articles",
    icon: BookOpen,
  },
  {
    name: "Visitor Map",
    href: "/globe",
    icon: Map,
  },
  {
    name: "Guestbook",
    href: "/guestbook",
    icon: MessageSquare,
  },
  {
    name: "Timeline",
    href: "/timeline",
    icon: Activity,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: Mail,
  },
];

export const BOTTOM_ROUTES = [
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
