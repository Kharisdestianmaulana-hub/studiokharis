import { fetchFromHub } from "@/lib/appwrite";

export interface RoadmapTask {
  id: string;
  label: string;
  done: boolean;
}

export interface Roadmap {
  $id: string;
  year: string;
  title: string;
  tasks: RoadmapTask[];
  is_active: boolean;
  $createdAt: string;
}

export async function getRoadmaps(): Promise<Roadmap[]> {
  try {
    const documents = await fetchFromHub("roadmaps", [
      { method: "equal", attribute: "is_active", values: [true] },
      { method: "orderDesc", attribute: "year" }
    ]);
    
    return documents.map((doc: any) => {
      let parsedTasks: RoadmapTask[] = [];
      try {
        if (typeof doc.tasks === "string") {
          parsedTasks = JSON.parse(doc.tasks);
        } else if (Array.isArray(doc.tasks)) {
          parsedTasks = doc.tasks;
        }
      } catch (e) {
        console.error("Failed to parse tasks for roadmap", doc.$id);
      }

      return {
        ...doc,
        tasks: parsedTasks
      };
    });
  } catch (error) {
    console.error("Failed to fetch roadmaps:", error);
    return [];
  }
}
