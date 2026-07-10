import { fetchFromHub } from "@/lib/appwrite";

export interface TechStack {
  $id: string;
  name: string;
  category: string;
  proficiency: number;
}

export interface TechStackItem {
  name: string;
  proficiency: number;
}

export interface TechStackCategory {
  category: string;
  items: TechStackItem[];
}

export async function getTechStack() {
  const documents = await fetchFromHub("public_techstack", [
    { method: "limit", values: [100] },
    { method: "orderDesc", attribute: "proficiency" }
  ]);
  
  const grouped = documents.reduce((acc: Record<string, TechStackItem[]>, doc: TechStack) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push({ name: doc.name, proficiency: doc.proficiency });
    return acc;
  }, {});

  return Object.keys(grouped).map(category => ({
    category,
    items: grouped[category]
  }));
}
