import { fetchFromHub } from "@/lib/appwrite";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";
import { IconType } from "react-icons";

export interface SocialLinkData {
  $id: string;
  platform: string;
  url: string;
  username: string;
  order_index: number;
}

export interface SocialLink {
  name: string;
  url: string;
  platformName: string;
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  const documents = await fetchFromHub("public_social_links", [
    { method: "orderAsc", attribute: "order_index" },
    { method: "limit", values: [50] }
  ]);
  
  return documents.map((doc: SocialLinkData) => {
    return {
      name: doc.platform,
      url: doc.url,
      platformName: doc.platform.toLowerCase(),
    };
  });
}
