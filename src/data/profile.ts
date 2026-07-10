import { fetchFromHub, fetchFilesFromHub, getAppwriteImageUrl, getAppwriteDownloadUrl } from "@/lib/appwrite";

export interface Bio {
  $id: string;
  name: string;
  tagline: string;
  about: string;
  avatar_url: string;
  email: string;
  github_url: string;
  linkedin_url: string;
}

export async function getProfileData() {
  const documents = await fetchFromHub("public_bio");
  const bio = documents.length > 0 ? (documents[0] as Bio) : null;
  
  // Fetch files to find the latest resume PDF
  const files = await fetchFilesFromHub();
  // Filter for PDF files and sort by creation date descending
  const resumeFiles = files.filter((f: any) => f.name.toLowerCase().endsWith('.pdf'))
                           .sort((a: any, b: any) => new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime());
  
  const resumeUrl = resumeFiles.length > 0 ? getAppwriteDownloadUrl(resumeFiles[0].$id) : "/resume.pdf";
  
  if (!bio) {
    return {
      name: "User",
      role: "Professional",
      tagline: "Welcome to my portfolio.",
      shortDescription: "I build exceptional digital experiences.",
      location: "Remote",
      availability: "Available for new opportunities",
      email: "hello@example.com",
      website: "example.com",
      avatarUrl: "",
      about: "I am a professional.",
      github_url: "",
      linkedin_url: "",
      resumeUrl,
    };
  }

  // Parse location and availability from tagline or about if needed, 
  // or add fallback values. For this implementation we map to existing UI needs.
  return {
    name: bio.name,
    role: "Senior Software Engineer", // Fallback/hardcoded or derived
    tagline: bio.tagline,
    shortDescription: "",
    location: "Remote",
    availability: "Available",
    email: bio.email,
    website: bio.email.split("@")[1] || "website.com",
    avatarUrl: getAppwriteImageUrl(bio.avatar_url),
    about: bio.about,
    github_url: bio.github_url,
    linkedin_url: bio.linkedin_url,
    resumeUrl,
  };
}
