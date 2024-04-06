
import { Sound } from '../Album_interface/album_interface';
import { getDB } from '../../ConnectDB/db';

export class SoundModel {
    static async getAll(): Promise<Sound[]> {
        try {
            const db = getDB();
            const collection = db.collection<Sound>('sounds');


            const sounds: Sound[] = await collection.find().toArray();

            return sounds;
        } catch (error) {
            console.error('ошибка получении всех треков:', error);
            throw error;
        }
    }

    static async addSound(newSound: Sound): Promise<void> {
        try {
            const db = getDB();
            const collection = db.collection<Sound>('sounds');


            await collection.insertOne(newSound);
        } catch (error) {
            console.error('ошибка записи трека:', error);
            throw error;
        }
    }
}