async function run() {
  const endpoint = process.env.VITE_APPWRITE_ENDPOINT || "https://sgp.cloud.appwrite.io/v1";
  const projectId = process.env.VITE_APPWRITE_PROJECT_ID;
  const databaseId = process.env.VITE_APPWRITE_DATABASE_ID;

  const url = `${endpoint}/databases/${databaseId}/collections/public_articles/documents`;
  const res = await fetch(url, {
    headers: {
      "X-Appwrite-Project": projectId,
      "Content-Type": "application/json"
    }
  });
  const data = await res.json();
  const article = data.documents.find(d => d.title.toLowerCase().includes("flowdesk"));
  console.log("Title:", article.title);
  console.log("Raw content:");
  console.log(article.content);
}
run();
