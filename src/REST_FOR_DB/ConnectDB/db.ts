
import { MongoClient, Db } from 'mongodb';

let db: Db;

export async function connectToMongo(): Promise<void> {
    const url = 'mongodb://localhost:27017';
    const dbName = 'musicParser';

    try {
        const client = new MongoClient(url);
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db(dbName);
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
