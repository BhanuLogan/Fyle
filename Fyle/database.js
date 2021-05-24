const { MongoClient } = require("mongodb");

let database = null;

exports.connect = async () => {
    const uri = "mongodb+srv://Bhanu:zYplkG1yJ59439AL@cluster0.5p5zo.mongodb.net/";
    const client = new MongoClient(uri, { useUnifiedTopology: true});

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("Database connected successfully");
        database = client;  
        
        return client;

    } catch (e) {
        console.error(e);
    } 
}

exports.getDBInstance = () => {
    return database;
}