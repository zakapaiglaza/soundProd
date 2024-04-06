import { Request, Response } from "express";
import { verifyToken } from "../../../JWT/jwt";
import { getDB } from "../../ConnectDB/db";
import { ObjectId } from "mongodb";

export class SoundLikeController {
    static async SoundLikeUser(req: Request, res: Response) {
        try {
            verifyToken(req, res, async () => {
                const { trackId, userId } = req.params;

                const db = getDB();

                const soundLikeCollection = db.collection('soundlikeusers');

                const finishLike = await soundLikeCollection.findOne({ userId: new ObjectId(userId), trackId });
                if (finishLike) {
                    return res.status(400).json({ message: 'трек уже лайкнут' });
                }
                await soundLikeCollection.insertOne({ userId: new ObjectId(userId), trackId });


                res.status(200).json({ message: 'добавлен в понравившиеся' });
            });
        } catch (e) {
            console.error('ошибка при лайке трека:', e);
            res.status(500).json({ message: 'ошибка при лайке трека' });
        }
    }
};