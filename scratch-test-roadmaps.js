async function run() {
  const endpoint = process.env.VITE_APPWRITE_ENDPOINT || "https://sgp.cloud.appwrite.io/v1";
  const projectId = process.env.VITE_APPWRITE_PROJECT_ID;
  const databaseId = process.env.VITE_APPWRITE_DATABASE_ID;

  for (const coll of ["roadmaps", "public_roadmaps"]) {
    const url = `${endpoint}/databases/${databaseId}/collections/${coll}/documents`;
    const res = await fetch(url, {
      headers: {
        "X-Appwrite-Project": projectId,
        "Content-Type": "application/json"
      }
    });
    if (res.ok) {
      const data = await res.json();
      console.log(`Success on ${coll}`);
      console.log(JSON.stringify(data, null, 2));
      return;
    } else {
      console.log(`Failed on ${coll}: ${res.status} ${res.statusText}`);
    }
  }
}
run();
