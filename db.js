import { MongoClient } from 'mongodb'; // database
import dotenv from 'dotenv'; // environment variables

dotenv.config();

// connect MongoDB
let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URL);
const promise = mongoClient.connect();
promise.then(() => {
    db = mongoClient.db(process.env.DATABASE);
    console.log("MongoDB database connected");
});
promise.catch((error) => console.log("Error connecting to database", error));

export default db;