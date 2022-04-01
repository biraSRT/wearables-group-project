const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { items } = require("./data/items.json");

//GET all items from "store" collection
const getItems = async (req, res) => {
  // Connect to MongoDB database
  const client = new MongoClient(MONGO_URI, option);
  await client.connect();
  const db = client.db();

  try {
    // Find ALL item documents in "store" collection
    const result = await db.collection("items").find({}).toArray();
    result
      ? res.status(200).json({ status: 200, data: result, message: "success" })
      : res.status(400).json({ status: 400, message: "error" });
  } catch (err) {
    res.status(500).json({ status: 500, message: "server error" });
  } finally {
    client.close();
  }
};

// GET single item based on provided item _id as URL params
const getItem = async (req, res) => {
  // Connect to MongoDB database
  const client = new MongoClient(MONGO_URI, option);
  await client.connect();
  const db = client.db();

  try {
    // Find item document based on it's _id
    const _id = req.params._id;
    const result = await db.collection("items").findOne({ _id: parseInt(_id) });
    result
      ? res.status(200).json({ status: 200, data: result, message: "success" })
      : res.status(400).json({ status: 400, message: "error" });
  } catch (err) {
    res.status(500).json({ status: 500, message: "server error" });
  } finally {
    client.close();
  }
};

// Update single item document "numInStock" based on provided:
// 1) item _id as URL params
// 2) quantity in request body
const placeOrder = async (req, res) => {
  // Connect to MongoDB database
  const client = new MongoClient(MONGO_URI, option);
  await client.connect();
  const db = client.db();

  // Request body
  const {
    name,
    email,
    address,
    city,
    province,
    postCode,
    country,
    creditCard,
    expiration,
    cart,
  } = req.body;

  // Error if customer data form is incomplete
  if (
    !name ||
    !email ||
    !address ||
    !city ||
    !province ||
    !postCode ||
    !country ||
    !creditCard ||
    !expiration
  ) {
    return res.status(400).json({
      status: 400,
      data: "Missing order data.",
      message: "error",
    });
  }

  // Email validation
  if (!email.includes("@")) {
    return res.status(400).json({
      status: 400,
      email,
      data: "Invalid email",
      message: "error",
    });
  }

  // Credit card and expiration validation
  if (!/^\d+$/.test(creditCard + expiration)) {
    return res.status(400).json({
      status: 400,
      email,
      data: "Invalid credit card information",
      message: "error",
    });
  }
  try {
    // FIRST, check that each item order quantity does not exceed numInStock
    for (let cartItem of cart) {
      const query = { _id: cartItem._id };
      const item = await db.collection("items").findOne(query);
      if (item.numInStock < cartItem.quantity || cartItem.quantity <= 0) {
        return res.status(400).json({
          status: 400,
          message: "error",
          data: "Invalid order quantity",
          item: cartItem,
        });
      }
    }

    // SECOND, update numInStock
    for (let cartItem of cart) {
      const query = { _id: cartItem._id };
      const item = await db.collection("items").findOne(query);
      const newStock = item.numInStock - cartItem.quantity;
      const newValues = { $set: { numInStock: newStock } };
      const updateMsg = await db
        .collection("items")
        .updateOne(query, newValues);
      if (!updateMsg.modifiedCount) {
        res.status(400).json({
          status: 400,
          message: "error",
          data: "Database stock not updated.",
          item: cartItem,
        });
      }
    }

    // IF no errors, send success response
    res.status(200).json({
      status: 200,
      message: "success",
      data: "Order placed, item stock updated.",
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: "server error" });
  } finally {
    client.close();
  }
};

// GET items based on provided "category" and/or "body_location"
const getFilteredItems = async (req, res) => {
  // Connect to MongoDB database
  const client = new MongoClient(MONGO_URI, option);
  await client.connect();
  const db = client.db();
  try {
    // Find items based on "category" and/or "body_location"
    const { category, body_location } = req.query;
    const query = {
      category: category == "All Categories" ? { $exists: true } : category,
      body_location:
        body_location == "Wear:" ? { $exists: true } : body_location,
    };
    const result = await db.collection("items").find(query).toArray();
    result
      ? res.status(200).json({
          status: 200,
          ...req.body,
          data: result,
          message: "success",
        })
      : res.status(404).json({
          status: 404,
          _id,
          ...req.body,
          data: "No items match provided category and/or body location.",
        });
  } catch (err) {
    res.status(500).json({ status: 500, message: "server error" });
  } finally {
    client.close();
  }
};

module.exports = { getItems, getItem, placeOrder, getFilteredItems };
