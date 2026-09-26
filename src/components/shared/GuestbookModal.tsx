"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Loader2, MessageSquarePlus } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function GuestbookModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const debouncedName = useDebounce(name, 500);
  const avatarUrl = debouncedName 
    ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(debouncedName)}` 
    : "https://api.dicebear.com/7.x/avataaars/svg?seed=guest";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("Please fill in both name and message");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
          avatarUrl
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit message");
      }

      toast.success("Message posted successfully!");
      setIsOpen(false);
      setName("");
      setMessage("");
      router.refresh(); // Refresh to show new message
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 rounded-none border-[3px] border-foreground bg-background text-foreground hover:bg-foreground hover:text-background font-black uppercase tracking-widest transition-colors shadow-[4px_4px_0_0_var(--foreground)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:translate-x-1 active:translate-y-1 py-6 px-6">
          <MessageSquarePlus className="w-5 h-5" />
          Sign Guestbook
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-[3px] border-foreground rounded-none shadow-[8px_8px_0_0_var(--foreground)] p-0 overflow-hidden bg-background">
        <DialogHeader className="bg-foreground text-background p-6">
          <DialogTitle className="text-2xl font-black uppercase tracking-widest text-background">Sign Guestbook</DialogTitle>
          <DialogDescription className="text-background/80 font-bold uppercase text-xs tracking-wider">
            Leave your mark on the server log
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="flex flex-col items-center gap-2 mb-4">
            <div className="relative w-20 h-20 rounded-none overflow-hidden bg-background border-[3px] border-foreground shadow-[4px_4px_0_0_var(--foreground)]">
              <Image 
                src={avatarUrl} 
                alt="Avatar Preview" 
                fill 
                className="object-cover grayscale"
                unoptimized
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-black uppercase tracking-wider">Name</label>
              <Input 
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="JOHN DOE"
                maxLength={64}
                required
                className="rounded-none border-[3px] border-foreground shadow-[4px_4px_0_0_var(--foreground)] focus-visible:ring-0 focus-visible:shadow-none focus-visible:translate-x-1 focus-visible:translate-y-1 transition-all bg-background text-foreground font-black uppercase"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-black uppercase tracking-wider">Message</label>
              <Textarea 
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="YOUR MESSAGE..."
                maxLength={500}
                required
                className="resize-none rounded-none border-[3px] border-foreground shadow-[4px_4px_0_0_var(--foreground)] focus-visible:ring-0 focus-visible:shadow-none focus-visible:translate-x-1 focus-visible:translate-y-1 transition-all bg-background text-foreground font-medium"
                rows={4}
              />
              <p className="text-xs text-right font-black opacity-50">
                {message.length}/500
              </p>
            </div>
          </div>
          
          <Button type="submit" className="w-full rounded-none border-[3px] border-foreground bg-foreground text-background hover:bg-background hover:text-foreground font-black uppercase tracking-widest text-lg py-6 transition-colors shadow-[4px_4px_0_0_var(--foreground)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:translate-x-1 active:translate-y-1" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                POSTING...
              </>
            ) : (
              "POST MESSAGE"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
