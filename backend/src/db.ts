import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/Taka_Gelo_Koi";
const client = new MongoClient(uri);

export const mongoClient = client;
export const db = client.db("Taka_Gelo_Koi");
