export const APPWRITE_ENDPOINT = process.env.VITE_APPWRITE_ENDPOINT || "https://sgp.cloud.appwrite.io/v1";
export const APPWRITE_PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID || "";
export const APPWRITE_DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID || "";
export const APPWRITE_PROJECTS_COLLECTION_ID = process.env.VITE_APPWRITE_COLLECTION_ID || "";
export const APPWRITE_IMAGES_BUCKET_ID = process.env.VITE_APPWRITE_PROJECT_IMAGES_BUCKET_ID || "";

/**
 * Fetch documents from an Appwrite collection using the REST API.
 * This is optimized for Next.js Server Components.
 */
export async function fetchFromHub(collectionId: string, queries: any[] = []) {
  if (!APPWRITE_PROJECT_ID || !APPWRITE_DATABASE_ID) {
    console.warn("Appwrite credentials are not fully configured.");
    return [];
  }

  // Ensure default limit of 100 instead of Appwrite's default 25
  const hasLimit = queries.some(q => q.method === "limit");
  if (!hasLimit) {
    queries.push({ method: "limit", values: [100] });
  }

  let url = `${APPWRITE_ENDPOINT}/databases/${APPWRITE_DATABASE_ID}/collections/${collectionId}/documents`;

  if (queries.length > 0) {
    const params = queries.map((q) => `queries[]=${encodeURIComponent(JSON.stringify(q))}`);
    url += `?${params.join("&")}`;
  }

  try {
    const response = await fetch(url, {
      headers: {
        "X-Appwrite-Project": APPWRITE_PROJECT_ID,
        "Content-Type": "application/json",
      },
      // Cache the response, but revalidate every 60 seconds (ISR)
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`Failed to fetch from ${collectionId}: ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    return data.documents || [];
  } catch (error) {
    console.error(`Error fetching from ${collectionId}:`, error);
    return [];
  }
}

/**
 * Helper to generate Appwrite Storage Image URL
 */
export function getAppwriteImageUrl(fileId: string): string {
  if (!fileId) return "";
  if (fileId.startsWith("http")) return fileId;
  return `${APPWRITE_ENDPOINT}/storage/buckets/${APPWRITE_IMAGES_BUCKET_ID}/files/${fileId}/view?project=${APPWRITE_PROJECT_ID}`;
}

export function getAppwriteDownloadUrl(fileId: string): string {
  if (!fileId) return "";
  if (fileId.startsWith("http")) return fileId;
  return `${APPWRITE_ENDPOINT}/storage/buckets/${APPWRITE_IMAGES_BUCKET_ID}/files/${fileId}/download?project=${APPWRITE_PROJECT_ID}`;
}

export async function fetchFilesFromHub() {
  if (!APPWRITE_PROJECT_ID || !APPWRITE_IMAGES_BUCKET_ID) return [];
  const url = `${APPWRITE_ENDPOINT}/storage/buckets/${APPWRITE_IMAGES_BUCKET_ID}/files`;
  try {
    const response = await fetch(url, {
      headers: {
        "X-Appwrite-Project": APPWRITE_PROJECT_ID,
      },
      next: { revalidate: 60 },
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.files || [];
  } catch (error) {
    console.error("Error fetching files from Hub:", error);
    return [];
  }
}
