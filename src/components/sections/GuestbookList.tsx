"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare } from "lucide-react";

interface GuestbookMessage {
  $id: string;
  name: string;
  message: string;
  avatarUrl: string;
  $createdAt: string;
}

interface GuestbookListProps {
  messages: GuestbookMessage[];
}

export function GuestbookList({ messages }: GuestbookListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border-[3px] border-foreground rounded-none shadow-[8px_8px_0_0_var(--foreground)] bg-background mt-8">
        <MessageSquare className="w-12 h-12 mb-4" />
        <h3 className="text-xl font-black uppercase tracking-widest">No messages yet</h3>
        <p className="text-sm font-bold uppercase mt-1">
          Be the first to leave a message in the guestbook!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {messages.map((msg, index) => {
        // Checkerboard effect: Alternate colors based on index for a brutalist feel
        const isDark = (index % 4 === 1) || (index % 4 === 2);
        
        return (
          <motion.div
            key={msg.$id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
            className={`flex flex-col rounded-none border-[3px] border-foreground shadow-[8px_8px_0_0_var(--foreground)] overflow-hidden ${isDark ? 'bg-foreground text-background' : 'bg-background text-foreground'}`}
          >
            {/* Header / Name plate */}
            <div className={`flex items-center gap-4 p-4 border-b-[3px] border-current ${isDark ? 'bg-background text-foreground' : 'bg-foreground text-background'}`}>
              <div className="shrink-0 relative w-12 h-12 border-[3px] border-current bg-background p-0.5">
                <Image 
                  src={msg.avatarUrl} 
                  alt={msg.name} 
                  fill 
                  className="object-cover grayscale"
                  unoptimized
                />
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-black text-lg uppercase tracking-wider truncate">{msg.name}</h4>
                <time className="text-xs font-bold uppercase opacity-80 shrink-0">
                  {formatDistanceToNow(new Date(msg.$createdAt), { addSuffix: true })}
                </time>
              </div>
            </div>
            
            {/* Body / Message */}
            <div className="p-5 flex-1 flex flex-col justify-center">
              <p className="text-sm font-medium leading-relaxed break-words whitespace-pre-wrap">
                {msg.message}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
