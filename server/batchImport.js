const { MongoClient } = require("mongodb");
require("dotenv").config();

// MongoDB URI
const { MONGO_URI } = process.env;

// Import items.json and companies.json
const items = require("./data/items.json");
const companies = require("./data/companies.json");

// MongoDB options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Batch import to MongoDB Database "store"
const batchImport = async () => {
  // Connect to MongoDB
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db();
  try {
    // Import items to "items" collection
    await db.collection("items").insertMany(items);
    // Import companies to "companies" collection
    await db.collection("companies").insertMany(companies);
    console.log("Import success");
  } catch (err) {
    console.log(err.message);
  }
  client.close();
};

batchImport();
