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
      <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed rounded-2xl border-border bg-secondary/5">
        <MessageSquare className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-lg font-medium">No messages yet</h3>
        <p className="text-muted-foreground mt-1 max-w-sm">
          Be the first to leave a message in the guestbook!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg, index) => (
        <motion.div
          key={msg.$id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
          className="p-4 sm:p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow group"
        >
          <div className="flex gap-4">
            <div className="shrink-0">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-muted border border-border">
                <Image 
                  src={msg.avatarUrl} 
                  alt={msg.name} 
                  fill 
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-2">
                <h4 className="font-semibold text-foreground truncate">{msg.name}</h4>
                <time className="text-xs text-muted-foreground shrink-0">
                  {formatDistanceToNow(new Date(msg.$createdAt), { addSuffix: true })}
                </time>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed break-words whitespace-pre-wrap">
                {msg.message}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
