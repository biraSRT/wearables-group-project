
const { MongoClient } = require("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const { items } = require("./data/items.json");



//gets all item data from json file

const getItems = async (req, res) => {
    const client = new MongoClient(MONGO_URI, option);
    await client.connect();
    const db = client.db();
    try{
        const result = await db.collection("items").find({}).toArray();

        result
        ? res.status(200).json({status: 200, data: result, message: "success"})
        : res.status(400).json({status: 400, message: "error"})
    }
    catch(err){
        res.status(500).json({status: 500, message: "server error"})
    } finally {
        client.close();
    }

};

const getItem = async (req, res) => {
    const client = new MongoClient(MONGO_URI, option);
    await client.connect();
    const db = client.db();

    try{
        const _id = req.params._id;
        const result = await db.collection("items").findOne({ _id:  parseInt(_id)});
        result
        ? res.status(200).json({status: 200, data: result, message: "success"})
        : res.status(400).json({status: 400, message: "error"})
    }
    catch(err){
        res.status(500).json({status: 500, message: "server error"})
    } finally {
        client.close();
    }
};


module.exports = { getItems, getItem };