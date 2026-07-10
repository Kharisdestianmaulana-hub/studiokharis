import { fetchFromHub } from "@/lib/appwrite";

export interface Experience {
  $id: string;
  company: string;
  role: string;
  period: string;
  address: string;
  description: string;
  type: 'Work' | 'Education' | 'Certification' | 'Internship' | 'Volunteer';
  $createdAt: string;
}

export async function getExperiences() {
  const documents = await fetchFromHub("public_experiences", [
    { method: "orderDesc", attribute: "$createdAt" }
  ]);
  
  return documents
    .filter((doc: Experience) => doc.type !== 'Certification') // Certificates handled separately
    .map((doc: Experience) => ({
      id: doc.$id,
      company: doc.company,
      role: doc.role,
      duration: doc.period,
      description: doc.description,
      type: doc.type,
      address: doc.address || "",
      technologies: [],
    }));
}
