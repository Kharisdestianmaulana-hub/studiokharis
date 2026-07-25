async function run() {
  const endpoint = process.env.VITE_APPWRITE_ENDPOINT || "https://sgp.cloud.appwrite.io/v1";
  const projectId = process.env.VITE_APPWRITE_PROJECT_ID;
  const databaseId = process.env.VITE_APPWRITE_DATABASE_ID;
  const apiKey = process.env.APPWRITE_API_KEY;

  if(!apiKey) {
     console.log("No API key available for server-side operations.");
     return;
  }

  const url = `${endpoint}/databases/${databaseId}/collections`;
  const res = await fetch(url, {
    headers: {
      "X-Appwrite-Project": projectId,
      "X-Appwrite-Key": apiKey,
      "Content-Type": "application/json"
    }
  });
  const data = await res.json();
  console.log("Collections:", data.collections ? data.collections.map(c => ({id: c.$id, name: c.name})) : data);
}
run();
