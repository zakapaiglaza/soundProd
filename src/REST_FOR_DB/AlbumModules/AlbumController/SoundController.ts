
import { Request, Response } from "express";
import { SoundModel } from "../Album_interface/SoundInterface";
import { ObjectId } from "mongodb";

export class SoundController {
    static async addSound(req: Request, res: Response) {
        try {
            const { title, url } = req.body;
            const newSound = { _id: new ObjectId(), title, url };

            await SoundModel.addSound(newSound);
            res.status(200).json({ message: 'трек записан в базу' });
        } catch (error) {
            console.error('ошибка записи трека:', error);
            res.status(500).json({ message: 'ошибка записи трека' });
        }
    }

    static async getAllSounds(req: Request, res: Response) {
        try {
            const sounds = await SoundModel.getAll();
            res.status(200).json(sounds);
        } catch (error) {
            console.error('ошибка при получении всех звуковых треков:', error);
            res.status(500).json({ message: 'ошибка при получении всех звуковых треков' });
        }
    }
}