import { fetchFromHub, getAppwriteImageUrl } from "@/lib/appwrite";

export interface Article {
  $id: string;
  title: string;
  content: string;
  cover_image: string;
  tags: string;
  is_published: boolean;
  target_website: string;
  $createdAt: string;
}

export async function getArticles() {
  const documents = await fetchFromHub("public_articles", [
    { method: "equal", attribute: "target_website", values: ["portfolio", "studiokharis.works"] },
    { method: "equal", attribute: "is_published", values: [true] },
    { method: "orderDesc", attribute: "$createdAt" }
  ]);
  
  return documents.map((doc: Article) => ({
    id: doc.$id,
    title: doc.title,
    content: doc.content,
    excerpt: doc.content.substring(0, 150) + "...", // basic excerpt fallback
    category: Array.isArray(doc.tags) ? (doc.tags[0] || "Blog") : (typeof doc.tags === "string" ? doc.tags.split(",")[0].trim() : "Blog"),
    date: doc.$createdAt,
    readingTime: "5 min read", // derived or mapped if possible
    slug: doc.$id, // or mapped from title
    cover: getAppwriteImageUrl(doc.cover_image),
  }));
}
