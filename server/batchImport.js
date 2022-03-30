const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const items = require("./data/items.json");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db();
  try {
    await db.collection("items").insertMany(items);
    console.log("Import success");
  } catch (err) {
    console.log(err.message);
  }
  client.close();
};

batchImport();
