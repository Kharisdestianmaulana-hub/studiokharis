import { getProfileData } from "@/data/profile";

export async function Footer() {
  const currentYear = new Date().getFullYear();
  const profileData = await getProfileData();
  
  return (
    <footer className="w-full border-t border-border mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted">
          &copy; {currentYear} {profileData.name}. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm text-muted">
          {/* Social links are handled in the contact section / hero */}
        </div>
      </div>
    </footer>
  );
}
