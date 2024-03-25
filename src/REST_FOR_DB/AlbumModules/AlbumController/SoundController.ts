import { Request, Response } from "express";
import SoundModel from "../Album_interface/SoundInterface";

export class SoundController {
    static async AddSound(req: Request, res: Response) {
        try {
            const { title, url } = req.body;

            const newSound = new SoundModel({
                title: title,
                url: url
            });
            const saveSound = await newSound.save();
            res.status(200).json(saveSound);
        } catch (e) {
            console.error('ошибка добавлении трека');
            res.status(500).json({ message: 'ошибка добавлении трека' });
        }
    }
    static async getAllSounds(req: Request, res: Response) {
        try {
            const sounds = await SoundModel.find();
            res.status(200).json(sounds);
        } catch (e) {
            console.error('ошибка получения всех треков');
            res.status(500).json({ message: 'ошибка получения всех треков' });
        }
    }

};
