import { ContactSection } from "@/components/sections/ContactSection";
import { getSocialLinks } from "@/data/socials";

export const metadata = {
  title: "Contact | Studiokharis",
  description: "Contact Kharis Destian Maulana",
};

export default async function ContactPage() {
  const socialsData = await getSocialLinks();
  
  return (
    <div className="flex flex-col gap-16 pb-16 pt-8">
      <ContactSection socialsData={socialsData} />
    </div>
  );
}
