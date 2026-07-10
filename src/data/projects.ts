import { fetchFromHub, getAppwriteImageUrl, APPWRITE_PROJECTS_COLLECTION_ID } from "@/lib/appwrite";

export interface Project {
  $id: string;
  title: string;
  category: string;
  tech_stack: string;
  status: "Planning" | "In-Progress" | "Completed" | "Archived";
  visibility: boolean;
  content_body: string;
  cover_image_id: string;
  image_ids?: string[];
  $createdAt: string;
}

export async function getProjects() {
  const documents = await fetchFromHub(APPWRITE_PROJECTS_COLLECTION_ID, [
    { method: "equal", attribute: "visibility", values: [true] },
    { method: "orderDesc", attribute: "$createdAt" }
  ]);
  
  return documents.map((doc: Project) => ({
    id: doc.$id,
    title: doc.title,
    description: doc.content_body,
    thumbnail: getAppwriteImageUrl(doc.cover_image_id),
    images: Array.isArray(doc.image_ids) ? doc.image_ids.map(getAppwriteImageUrl) : (doc.cover_image_id ? [getAppwriteImageUrl(doc.cover_image_id)] : []),
    techStack: Array.isArray(doc.tech_stack) ? doc.tech_stack : (typeof doc.tech_stack === "string" ? doc.tech_stack.split(",").map(t => t.trim()) : []),
    status: doc.status,
    category: doc.category,
    date: doc.$createdAt,
    github: "", // Extracted if we map it, maybe from content_body or another field
    liveDemo: "",
    featured: true, // we could determine this by a field if it exists
  }));
}
