import { getDictionary } from "@/lib/i18n";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import { 
  QrCode, 
  Image as ImageIcon, 
  Crop, 
  ArrowRightLeft, 
  Braces, 
  KeyRound, 
  Palette, 
  Contrast, 
  Percent, 
  Type
} from "lucide-react";

export const metadata = {
  title: 'Toolbox | Studio Kharis',
  description: 'A collection of handy mini-tools.',
};

export default async function ToolboxPage() {
  const dict = await getDictionary();

  const tools = [
    {
      id: 'qr-generator',
      icon: QrCode,
      title: dict.toolbox.tools.qr.title,
      desc: dict.toolbox.tools.qr.desc,
      href: "/toolbox/qr-generator",
      color: "bg-foreground text-background"
    },
    {
      id: 'image-compressor',
      icon: ImageIcon,
      title: dict.toolbox.tools.compressor.title,
      desc: dict.toolbox.tools.compressor.desc,
      href: "/toolbox/image-compressor",
      color: "bg-foreground text-background"
    },
    {
      id: 'image-resizer',
      icon: Crop,
      title: dict.toolbox.tools.resizer.title,
      desc: dict.toolbox.tools.resizer.desc,
      href: "/toolbox/image-resizer",
      color: "bg-foreground text-background"
    },
    {
      id: 'image-converter',
      icon: ArrowRightLeft,
      title: dict.toolbox.tools.converter.title,
      desc: dict.toolbox.tools.converter.desc,
      href: "/toolbox/image-converter",
      color: "bg-foreground text-background"
    },
    {
      id: 'json-formatter',
      icon: Braces,
      title: dict.toolbox.tools.json.title,
      desc: dict.toolbox.tools.json.desc,
      href: "/toolbox/json-formatter",
      color: "bg-foreground text-background"
    },
    {
      id: 'password-generator',
      icon: KeyRound,
      title: dict.toolbox.tools.password.title,
      desc: dict.toolbox.tools.password.desc,
      href: "/toolbox/password-generator",
      color: "bg-foreground text-background"
    },
    {
      id: 'color-converter',
      icon: Palette,
      title: dict.toolbox.tools.color.title,
      desc: dict.toolbox.tools.color.desc,
      href: "/toolbox/color-converter",
      color: "bg-foreground text-background"
    },
    {
      id: 'contrast-checker',
      icon: Contrast,
      title: dict.toolbox.tools.contrast.title,
      desc: dict.toolbox.tools.contrast.desc,
      href: "/toolbox/contrast-checker",
      color: "bg-foreground text-background"
    },
    {
      id: 'percentage-calculator',
      icon: Percent,
      title: dict.toolbox.tools.percentage.title,
      desc: dict.toolbox.tools.percentage.desc,
      href: "/toolbox/percentage-calculator",
      color: "bg-foreground text-background"
    },
    {
      id: 'word-counter',
      icon: Type,
      title: dict.toolbox.tools.wordCount.title,
      desc: dict.toolbox.tools.wordCount.desc,
      href: "/toolbox/word-counter",
      color: "bg-foreground text-background"
    }
  ];

  return (
    <div className="flex flex-col gap-12 w-full max-w-6xl mx-auto min-h-[50vh]">
      <div className="flex flex-col gap-4 border-b-[3px] border-foreground pb-8">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase">
          {dict.toolbox.title}
        </h1>
        <p className="text-foreground font-bold tracking-widest uppercase text-sm md:text-base max-w-2xl">
          {dict.toolbox.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link 
            key={tool.id} 
            href={tool.href}
            className="flex flex-col gap-4 p-6 bg-surface border-[3px] border-foreground shadow-[6px_6px_0_0_var(--foreground)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group animate-in fade-in slide-in-from-bottom-4"
          >
            <div className={`w-14 h-14 border-[3px] border-foreground flex items-center justify-center shrink-0 ${tool.color}`}>
              <tool.icon className="w-7 h-7 text-background stroke-[2.5]" />
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <h3 className="text-xl font-black uppercase tracking-widest text-foreground group-hover:bg-foreground group-hover:text-background w-fit transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm font-bold text-foreground opacity-80 leading-snug">
                {tool.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
