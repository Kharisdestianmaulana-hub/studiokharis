async function run() {
  const endpoint = process.env.VITE_APPWRITE_ENDPOINT || "https://sgp.cloud.appwrite.io/v1";
  const projectId = process.env.VITE_APPWRITE_PROJECT_ID;
  const databaseId = process.env.VITE_APPWRITE_DATABASE_ID;

  if (!projectId || !databaseId) {
    console.log("Missing credentials");
    return;
  }

  const url = `${endpoint}/databases/${databaseId}/collections`;
  const res = await fetch(url, {
    headers: {
      "X-Appwrite-Project": projectId,
      "Content-Type": "application/json"
    }
  });

  const data = await res.json();
  console.log(JSON.stringify(data.collections?.map(c => ({ id: c.$id, name: c.name })) || data, null, 2));
}
run();
