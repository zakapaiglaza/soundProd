import { MongoClient, Db } from 'mongodb';
import * as dotenv from 'dotenv';

let db: Db;
dotenv.config();


export async function connectToMongo(): Promise<void> {
    const url = process.env.MONGODB_URL!;
    const dbName = process.env.DB_NAME;

    try {
        const client = new MongoClient(url);
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db(dbName);

        const adminDb = db.admin();
        const info = await adminDb.serverStatus();
        console.log(`MongoDB version: ${info.version}`);
    } catch (error) {
        console.error('Connection error:', error);
        throw error;
    }
}

export function getDB(): Db {
    if (!db) {
        throw new Error('Database is not connected');
    }
    return db;
}
