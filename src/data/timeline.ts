import { fetchFromHub } from "@/lib/appwrite";

export interface ChangelogEntry {
  $id: string;
  project_id: string;
  project_name: string;
  version: string;
  release_date: string;
  type: 'Release' | 'Feature' | 'Bugfix' | 'Improvement' | 'Breaking Change';
  description: string;
  $createdAt: string;
}

export async function getChangelogs() {
  const documents = await fetchFromHub("changelogs", [
    { method: "orderDesc", attribute: "$createdAt" },
    { method: "limit", values: [100] }
  ]);
  
  return documents.map((doc: ChangelogEntry) => ({
    id: doc.$id,
    project_name: doc.project_name,
    version: doc.version,
    type: doc.type,
    description: doc.description,
    date: doc.release_date || doc.$createdAt,
  }));
}
