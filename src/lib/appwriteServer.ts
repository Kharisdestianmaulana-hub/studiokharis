import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_DATABASE_ID } from "./appwrite";

const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY || "";
export const GUESTBOOK_COLLECTION_ID = "guestbook";

export async function fetchGuestbookMessages() {
  const url = `${APPWRITE_ENDPOINT}/databases/${APPWRITE_DATABASE_ID}/collections/${GUESTBOOK_COLLECTION_ID}/documents?queries[]=${encodeURIComponent(JSON.stringify({ method: "orderDesc", values: ["$createdAt"] }))}&queries[]=${encodeURIComponent(JSON.stringify({ method: "limit", values: [100] }))}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        "X-Appwrite-Project": APPWRITE_PROJECT_ID,
        "Content-Type": "application/json",
      },
      // Disable cache so new messages appear immediately
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Failed to fetch guestbook: ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    return data.documents || [];
  } catch (error) {
    console.error("Error fetching guestbook:", error);
    return [];
  }
}

export async function createGuestbookMessage(data: { name: string; message: string; avatarUrl: string; latitude?: number; longitude?: number }) {
  if (!APPWRITE_API_KEY) {
    console.warn("APPWRITE_API_KEY is not set! Creation might fail if permissions are restricted.");
  }

  const url = `${APPWRITE_ENDPOINT}/databases/${APPWRITE_DATABASE_ID}/collections/${GUESTBOOK_COLLECTION_ID}/documents`;
  
  const headers: Record<string, string> = {
    "X-Appwrite-Project": APPWRITE_PROJECT_ID,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      documentId: "unique()",
      data,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Failed to create message: ${errorData}`);
  }

  return await response.json();
}

export async function enforceGuestbookLimit(limit: number = 40000) {
  if (!APPWRITE_API_KEY) return; // Cannot delete without API key

  try {
    // 1. Get total count
    // Fetch only 1 document but we get the "total" from the response
    const countUrl = `${APPWRITE_ENDPOINT}/databases/${APPWRITE_DATABASE_ID}/collections/${GUESTBOOK_COLLECTION_ID}/documents?queries[]=${encodeURIComponent(JSON.stringify({ method: "limit", values: [1] }))}`;
    
    const countRes = await fetch(countUrl, {
      headers: {
        "X-Appwrite-Project": APPWRITE_PROJECT_ID,
        "X-Appwrite-Key": APPWRITE_API_KEY,
        "Content-Type": "application/json",
      }
    });

    if (!countRes.ok) return;
    const countData = await countRes.json();
    const total = countData.total;

    if (total > limit) {
      const excess = total - limit;
      // 2. Fetch the oldest documents to delete
      const oldestUrl = `${APPWRITE_ENDPOINT}/databases/${APPWRITE_DATABASE_ID}/collections/${GUESTBOOK_COLLECTION_ID}/documents?queries[]=${encodeURIComponent(JSON.stringify({ method: "orderAsc", values: ["$createdAt"] }))}&queries[]=${encodeURIComponent(JSON.stringify({ method: "limit", values: [excess] }))}`;
      
      const oldestRes = await fetch(oldestUrl, {
        headers: {
          "X-Appwrite-Project": APPWRITE_PROJECT_ID,
          "X-Appwrite-Key": APPWRITE_API_KEY,
          "Content-Type": "application/json",
        }
      });

      if (!oldestRes.ok) return;
      const oldestData = await oldestRes.json();
      
      // 3. Delete each excess document
      for (const doc of oldestData.documents) {
        await fetch(`${APPWRITE_ENDPOINT}/databases/${APPWRITE_DATABASE_ID}/collections/${GUESTBOOK_COLLECTION_ID}/documents/${doc.$id}`, {
          method: "DELETE",
          headers: {
            "X-Appwrite-Project": APPWRITE_PROJECT_ID,
            "X-Appwrite-Key": APPWRITE_API_KEY,
          }
        });
      }
    }
  } catch (error) {
    console.error("Failed to enforce guestbook limit:", error);
  }
}

export async function fetchGlobeCoordinates() {
  const url = `${APPWRITE_ENDPOINT}/databases/${APPWRITE_DATABASE_ID}/collections/${GUESTBOOK_COLLECTION_ID}/documents?queries[]=${encodeURIComponent(JSON.stringify({ method: "limit", values: [1000] }))}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        "X-Appwrite-Project": APPWRITE_PROJECT_ID,
        "Content-Type": "application/json",
      },
      next: { revalidate: 60, tags: ["globe"] },
    });

    if (!response.ok) return [];

    const data = await response.json();
    return data.documents.map((doc: any) => ({
      latitude: doc.latitude,
      longitude: doc.longitude
    }));
  } catch (error) {
    console.error("Error fetching globe coordinates:", error);
    return [];
  }
}
