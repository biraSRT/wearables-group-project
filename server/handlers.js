
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

const updateStock = async (req, res) => {
    const client = new MongoClient(MONGO_URI, option);
    await client.connect();
    const db = client.db();
    try{
        const _id= parseInt(req.params._id);

        const query = { _id };

        const item = await db.collection("items").findOne(query);


        item.numInStock = item.numInStock - req.body.quantity;

        let result = await db.collection("items").updateOne(query, { $set: {numInStock: item.numInStock} });

        console.log(result);

        result
            ? res.status(200).json({ status: 200, _id, ...req.body })
            : res.status(404).json({ status: 404, _id, data: "invalid key" });
        
    }
    catch(err){
        res.status(500).json(err);
    }
    
};


module.exports = { getItems, getItem, updateStock };