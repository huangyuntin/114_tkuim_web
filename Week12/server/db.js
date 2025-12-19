import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);
let db = null;

export async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db();
    console.log('MongoDB Connected');
  }
  return db;
}

export function getCollection(name) {
  if (!db) throw new Error('Database not connected');
  return db.collection(name);
}