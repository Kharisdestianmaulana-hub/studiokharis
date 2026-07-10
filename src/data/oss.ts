import { fetchFromHub } from "@/lib/appwrite";

export interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  license: string;
  url: string;
}

export async function getOpenSource() {
  const documents = await fetchFromHub("public_gallery", [
    { method: "equal", attribute: "category", values: ["Open Source"] },
    { method: "orderDesc", attribute: "$createdAt" }
  ]);
  
  return documents.map((doc: any) => ({
    id: doc.$id,
    name: doc.title,
    description: "Open source project from gallery", // fallback if no desc field
    language: "TypeScript", // fallback
    languageColor: "#3178c6",
    stars: 0,
    forks: 0,
    license: "MIT",
    url: doc.link_url || "",
  }));
}
