"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Send, ExternalLink, Calendar, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaGlobe, FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  company: z.string().optional(),
  service: z.string().min(2, { message: "Service is required." }),
  email: z.string().email({ message: "Invalid email." }),
  message: z.string().min(5, { message: "Please provide a few more details." }),
});

export function ContactSection({ socialsData }: { socialsData: any[] }) {
  const [time, setTime] = React.useState<string>("");

  React.useEffect(() => {
    // Update time every second
    const updateClock = () => {
      const now = new Date();
      // Format to WIB (UTC+7)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(now.toLocaleTimeString("en-US", options));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      company: "",
      service: "",
      email: "",
      message: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  function onSubmit(values: z.infer<typeof formSchema>) {
    const subject = encodeURIComponent(`New Project Inquiry from ${values.name}`);
    let bodyText = `Hi Kharis,\n\nMy name is ${values.name}`;
    if (values.company) {
      bodyText += ` and I work at ${values.company}`;
    }
    bodyText += `. I'd love to work with you on ${values.service}.\n\nYou can reach me at ${values.email}.\n\nHere are some more details about the project:\n${values.message}`;
    
    const body = encodeURIComponent(bodyText);
    
    // Open default email client
    window.location.href = `mailto:kharisdestianm23@gmail.com?subject=${subject}&body=${body}`;
    
    toast.success("Opening your email app...", {
      description: "Please send the email from your default client.",
    });
  }

  // Helper for input classes to look like a legal contract blank
  const blankInputClass = "inline-flex h-auto py-1 min-w-[150px] max-w-full border-b-[4px] border-solid border-foreground bg-transparent px-2 text-center font-black text-foreground placeholder:font-black placeholder:opacity-30 focus-visible:outline-none focus-visible:border-foreground/50 transition-colors mx-1";
  
  // Custom error class
  const errorClass = "border-danger text-danger placeholder:text-danger/50";

  return (
    <section id="contact" className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-700 fill-mode-both mt-16">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 border-b-[3px] border-foreground pb-4">
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase">Get in Touch</h3>
          <p className="text-foreground font-bold tracking-widest uppercase text-xs md:text-sm">
            LET'S BUILD SOMETHING AMAZING TOGETHER. FILL IN THE BLANKS OR BOOK A CALL DIRECTLY.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-8 border-t-[3px] border-foreground">
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between h-full">
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full gap-12">
              
              {/* Mad Libs Form */}
              <div className="text-3xl md:text-5xl lg:text-[2.75rem] xl:text-6xl font-black tracking-tight leading-[2.2] md:leading-[2] text-foreground">
                Hi Kharis! My name is
                <input
                  {...form.register("name")}
                  placeholder="NAME"
                  className={`${blankInputClass} w-[180px] md:w-[280px] ${form.formState.errors.name ? errorClass : ''}`}
                />
                and I work at
                <input
                  {...form.register("company")}
                  placeholder="COMPANY"
                  className={`${blankInputClass} w-[220px] md:w-[320px]`}
                />
                . I'd love to work with you on
                <span className="inline-block mx-1 align-middle">
                  <Select onValueChange={(v) => form.setValue("service", v)} defaultValue={form.getValues("service")}>
                    <SelectTrigger className={`h-auto py-1 border-b-[4px] border-t-0 border-l-0 border-r-0 border-solid border-foreground bg-transparent rounded-none focus:ring-0 focus:border-foreground/50 w-auto min-w-[240px] md:min-w-[320px] text-3xl md:text-5xl lg:text-[2.75rem] xl:text-6xl font-black text-foreground px-2 ${form.formState.errors.service ? errorClass : ''}`}>
                      <SelectValue placeholder="SERVICE" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-[3px] border-foreground font-bold">
                      <SelectItem value="a new website">A NEW WEBSITE</SelectItem>
                      <SelectItem value="a mobile app">A MOBILE APP</SelectItem>
                      <SelectItem value="ui/ux design">UI/UX DESIGN</SelectItem>
                      <SelectItem value="consulting">CONSULTING</SelectItem>
                      <SelectItem value="something else">SOMETHING ELSE</SelectItem>
                    </SelectContent>
                  </Select>
                </span>
                . You can reach me at
                <input
                  {...form.register("email")}
                  placeholder="EMAIL"
                  className={`${blankInputClass} w-full md:w-[400px] ${form.formState.errors.email ? errorClass : ''}`}
                />
                . Here are some more details about the project:
                <div className="relative w-full mt-6 block">
                  <textarea
                    {...form.register("message")}
                    placeholder="BRIEF PROJECT DETAILS..."
                    maxLength={500}
                    rows={4}
                    className="w-full h-auto min-h-[160px] p-6 bg-transparent border-[4px] border-foreground text-2xl md:text-3xl font-black text-foreground placeholder:opacity-30 focus-visible:outline-none focus-visible:shadow-[8px_8px_0_0_var(--foreground)] transition-shadow resize-none rounded-none"
                  />
                  <div className="absolute bottom-4 right-4 text-sm font-black opacity-40">
                    {form.watch("message")?.length || 0}/500
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 mt-auto">
                <Button 
                  type="submit" 
                  disabled={!isValid || isSubmitting} 
                  className="rounded-none px-8 h-14 bg-foreground text-background font-bold tracking-widest uppercase hover:bg-foreground/90 transition-none"
                >
                  {isSubmitting ? (
                    "SENDING..."
                  ) : (
                    <>
                      SEND MESSAGE
                      <Send className="w-5 h-5 ml-3" />
                    </>
                  )}
                </Button>
                <a href="https://cal.com/riray/brief" target="_blank" rel="noreferrer">
                  <Button type="button" variant="outline" className="rounded-none px-8 h-14 border-[3px] border-foreground bg-background hover:bg-foreground hover:text-background text-foreground font-bold tracking-widest uppercase transition-colors group">
                    SCHEDULE A CALL 
                    <Calendar className="w-5 h-5 ml-3" />
                  </Button>
                </a>
              </div>
            </form>
          </div>
          
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-12 lg:border-l-[3px] lg:border-foreground lg:pl-12">
            {/* Availability & Time Card */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 pb-6 border-b-[3px] border-foreground">
                <div className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full bg-foreground opacity-30"></span>
                  <span className="relative inline-flex h-4 w-4 bg-foreground"></span>
                </div>
                <span className="text-sm font-bold tracking-widest uppercase text-foreground">Available for new projects</span>
              </div>
              
              <div className="flex items-center justify-between pb-6 border-b-[3px] border-foreground">
                <div className="flex items-center gap-3 text-foreground">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-bold tracking-widest uppercase">Local time (WIB)</span>
                </div>
                <span className="font-mono text-sm font-black text-foreground">
                  {time || "Loading..."}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-black text-2xl text-foreground uppercase tracking-tight mb-2">Connect with me</h4>
              
              <div className="flex flex-col w-full border-t-[3px] border-foreground mt-4">
                {socialsData.map((social: any) => {
                  let Icon = FaGlobe;
                  const p = social.platformName?.toLowerCase() || "";
                  if (p.includes("github")) Icon = FaGithub;
                  else if (p.includes("linkedin")) Icon = FaLinkedin;
                  else if (p.includes("twitter") || p.includes("x")) Icon = FaTwitter;
                  else if (p.includes("instagram")) Icon = FaInstagram;
                  else if (p.includes("whatsapp") || p.includes("wa")) Icon = FaWhatsapp;
                  else if (p.includes("email") || p.includes("mail")) Icon = FaEnvelope;
                  else if (p.includes("phone") || p.includes("call")) Icon = FaPhone;
                  
                  return (
                    <a 
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center py-4 border-b border-foreground hover:bg-foreground hover:text-background transition-colors group px-2"
                    >
                      <Icon className="w-5 h-5 text-foreground group-hover:text-background mr-4 transition-colors" />
                      <span className="font-bold text-sm uppercase tracking-wider">{social.name}</span>
                      <ExternalLink className="w-4 h-4 ml-auto text-foreground group-hover:text-background transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
