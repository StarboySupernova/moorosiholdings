// get-sanity.js
const fs = require('fs');

// Your exact Sanity endpoint (Querying all documents: *)
const url = "https://0fw4oxom.api.sanity.io/v2021-10-21/data/query/production?query=%2A";

async function dumpData() {
  console.log("Fetching all data from Sanity...");
  try {
    // Node 18 has native fetch
    const response = await fetch(url);
    const data = await response.json();
    
    // Save to a beautifully formatted JSON file
    fs.writeFileSync('sanity-dump.json', JSON.stringify(data.result, null, 2));
    
    console.log('✅ Success! Your entire database is now saved in sanity-dump.json');
  } catch (error) {
    console.error('❌ Error fetching data:', error);
  }
}

dumpData();