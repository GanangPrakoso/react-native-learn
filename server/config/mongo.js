const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db; // undefined
async function connect() {
    try {
        const database = client.db("belajar-mongodb");
        db = database;
        return database;
    } catch (error) {
        console.log(error);
    }
}

function getDb() {
    return db;
}

module.exports = { connect, getDb, client }; // undefined
