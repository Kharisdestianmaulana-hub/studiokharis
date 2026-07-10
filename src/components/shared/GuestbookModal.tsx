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
        <Button className="gap-2">
          <MessageSquarePlus className="w-4 h-4" />
          Sign Guestbook
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign the Guestbook</DialogTitle>
          <DialogDescription>
            Leave a message for me and other visitors. Your avatar will be generated based on your name!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-muted border-2 border-border">
              <Image 
                src={avatarUrl} 
                alt="Avatar Preview" 
                fill 
                className="object-cover"
                unoptimized
              />
            </div>
            <p className="text-xs text-muted-foreground">Avatar Preview</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Your Name</label>
              <Input 
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                maxLength={64}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea 
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave a nice message..."
                maxLength={500}
                required
                className="resize-none"
                rows={4}
              />
              <p className="text-xs text-right text-muted-foreground">
                {message.length}/500
              </p>
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Posting...
              </>
            ) : (
              "Post Message"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
