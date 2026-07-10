"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Send, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { getSocialLinks } from "@/data/socials";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export function ContactSection({ socialsData }: { socialsData: any[] }) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
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

  return (
    <section id="contact" className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-700 fill-mode-both">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">Get in Touch</h3>
          <p className="text-muted text-sm md:text-base max-w-xl">
            Have a question or want to work together? Leave a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <Card className="lg:col-span-3 bg-surface border-border overflow-hidden rounded-[16px]">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      {...form.register("name")}
                      className="bg-background border-border"
                    />
                    {form.formState.errors.name && (
                      <p className="text-xs text-danger">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                    <Input 
                      id="email" 
                      placeholder="john@example.com" 
                      {...form.register("email")}
                      className="bg-background border-border"
                    />
                    {form.formState.errors.email && (
                      <p className="text-xs text-danger">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell me about your project..." 
                    className="min-h-[150px] bg-background border-border resize-y"
                    {...form.register("message")}
                  />
                  {form.formState.errors.message && (
                    <p className="text-xs text-danger">{form.formState.errors.message.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full sm:w-auto self-start rounded-xl px-8"
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
              </form>
            </CardContent>
          </Card>
          
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card className="bg-surface border-border overflow-hidden rounded-[16px] h-full">
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
                    const p = social.platformName;
                    if (p.includes("github")) Icon = FaGithub;
                    else if (p.includes("linkedin")) Icon = FaLinkedin;
                    else if (p.includes("twitter") || p.includes("x")) Icon = FaTwitter;
                    else if (p.includes("instagram")) Icon = FaInstagram;
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
