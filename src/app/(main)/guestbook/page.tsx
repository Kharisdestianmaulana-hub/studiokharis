import { fetchGuestbookMessages } from "@/lib/appwriteServer";
import { GuestbookList } from "@/components/sections/GuestbookList";
import { GuestbookModal } from "@/components/shared/GuestbookModal";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export const metadata = {
  title: "Guestbook | Studiokharis",
  description: "Leave a message on my guestbook",
};

export default async function GuestbookPage() {
  const messages = await fetchGuestbookMessages();

  return (
    <div className="flex flex-col gap-10 pb-16 pt-6">
      <ScrollReveal delay={0.1}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Guestbook
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Leave a message, share a thought, or just say hi! 
              Messages are completely anonymous and public for everyone to see.
            </p>
          </div>
          <GuestbookModal />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2} yOffset={20}>
        <div className="pt-6 border-t border-border">
          <GuestbookList messages={messages} />
        </div>
      </ScrollReveal>
    </div>
  );
}
