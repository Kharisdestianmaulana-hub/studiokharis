require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

async function run() {
  const url = `${process.env.VITE_APPWRITE_ENDPOINT || "https://sgp.cloud.appwrite.io/v1"}/databases/${process.env.VITE_APPWRITE_DATABASE_ID}/collections/${process.env.VITE_APPWRITE_COLLECTION_ID}/documents`;
  const res = await fetch(url, {
    headers: {
      'X-Appwrite-Project': process.env.VITE_APPWRITE_PROJECT_ID
    }
  });
  const data = await res.json();
  console.log(data.documents.map(d => d.title));
}
run();
