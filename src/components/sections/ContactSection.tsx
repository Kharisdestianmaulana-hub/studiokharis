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
  const [isSubmitting, setIsSubmitting] = React.useState(false);
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
    defaultValues: {
      name: "",
      company: "",
      service: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully!", {
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      form.reset();
    }, 1500);
  }

  // Helper for input classes to look like a mad-libs blank
  const blankInputClass = "inline-flex h-8 w-[200px] border-b-2 border-dashed border-foreground/30 bg-transparent px-2 py-1 text-center text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors mx-1";
  
  // Custom error class
  const errorClass = "border-danger text-danger placeholder:text-danger/50";

  return (
    <section id="contact" className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-700 fill-mode-both">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">Get in Touch</h3>
          <p className="text-muted text-sm md:text-base max-w-xl">
            Let's build something amazing together. Fill in the blanks or book a call directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <Card className="lg:col-span-3 bg-surface border-border overflow-hidden rounded-[16px]">
            <CardContent className="p-6 md:p-8 flex flex-col justify-between h-full">
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full gap-8">
                
                {/* Mad Libs Form */}
                <div className="text-2xl md:text-3xl font-medium leading-[2] md:leading-[2.2] text-secondary-text">
                  Hi Kharis! My name is
                  <input
                    {...form.register("name")}
                    placeholder="your name"
                    className={`${blankInputClass} ${form.formState.errors.name ? errorClass : ''}`}
                    style={{ width: "220px" }}
                  />
                  and I work at
                  <input
                    {...form.register("company")}
                    placeholder="company (optional)"
                    className={blankInputClass}
                    style={{ width: "280px" }}
                  />
                  . I'd love to work with you on
                  <span className="inline-block mx-1 align-middle">
                    <Select onValueChange={(v) => form.setValue("service", v)} defaultValue={form.getValues("service")}>
                      <SelectTrigger className={`h-8 border-b-2 border-t-0 border-l-0 border-r-0 border-dashed border-foreground/30 bg-transparent rounded-none focus:ring-0 focus:border-primary w-[260px] text-lg text-foreground px-2 py-0 ${form.formState.errors.service ? errorClass : ''}`}>
                        <SelectValue placeholder="select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a new website">a new website</SelectItem>
                        <SelectItem value="a mobile app">a mobile app</SelectItem>
                        <SelectItem value="ui/ux design">ui/ux design</SelectItem>
                        <SelectItem value="consulting">consulting</SelectItem>
                        <SelectItem value="something else">something else</SelectItem>
                      </SelectContent>
                    </Select>
                  </span>
                  . You can reach me at
                  <input
                    {...form.register("email")}
                    placeholder="your email address"
                    className={`${blankInputClass} ${form.formState.errors.email ? errorClass : ''}`}
                    style={{ width: "320px" }}
                  />
                  . Here are some more details about the project:
                  <input
                    {...form.register("message")}
                    placeholder="brief project details..."
                    className={`${blankInputClass} ${form.formState.errors.message ? errorClass : ''}`}
                    style={{ width: "100%", maxWidth: "100%", marginTop: "8px" }}
                  />
                </div>
                
                <div className="flex flex-wrap items-center gap-4 mt-auto pt-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="rounded-xl px-8 h-12"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                  <a href="https://cal.com/riray" target="_blank" rel="noreferrer">
                    <Button type="button" variant="outline" className="rounded-xl px-8 h-12 border-primary/20 bg-transparent hover:bg-transparent text-foreground hover:text-accent hover:border-accent transition-colors group">
                      Book a 15-min call
                      <Calendar className="w-4 h-4 ml-2 text-primary group-hover:text-accent transition-colors" />
                    </Button>
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Availability & Time Card */}
            <Card className="bg-surface border-border overflow-hidden rounded-[16px] shrink-0">
              <CardContent className="p-6 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </div>
                  <span className="text-sm font-medium text-foreground">Available for new projects</span>
                </div>
                
                <div className="flex items-center justify-between border-t border-border/50 pt-4 mt-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Local time (WIB)</span>
                  </div>
                  <span className="font-mono text-sm font-medium text-foreground">
                    {time || "Loading..."}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-surface border-border overflow-hidden rounded-[16px] flex-1">
              <CardContent className="p-6 md:p-8 flex flex-col h-full gap-6">
                <div>
                  <h4 className="font-semibold text-lg text-foreground mb-2">Connect with me</h4>
                  <p className="text-sm text-secondary-text leading-relaxed">
                    I'm active on several platforms. Feel free to reach out or connect with me on your preferred social network.
                  </p>
                </div>
                
                <div className="flex flex-col gap-3 mt-auto">
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
                        className="flex items-center p-3 rounded-lg hover:bg-secondary/10 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center mr-3 group-hover:bg-secondary/20 transition-colors">
                          <Icon className="w-4 h-4 text-secondary-text group-hover:text-foreground transition-colors" />
                        </div>
                        <span className="font-medium text-sm text-foreground">{social.name}</span>
                        <ExternalLink className="w-4 h-4 ml-auto text-muted group-hover:text-foreground transition-colors" />
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
