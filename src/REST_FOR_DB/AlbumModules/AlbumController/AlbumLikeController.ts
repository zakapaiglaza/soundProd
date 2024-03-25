import { Request, Response } from "express";
import SoundLikeUserModel from "../Album_interface/soundLikeUser";
import { verifyToken } from "../../../JWT/jwt";

export class SoundLikeController {
    static async SoundLikeUser(req: Request, res: Response) {
        try {
            verifyToken(req, res, async () => {
                const { trackId, userId } = req.params;

                const finishLike = await SoundLikeUserModel.findOne({ userId, trackId });

                if (finishLike) {
                    return res.status(400).json({ message: 'Трек уже лайкнут' });
                }
                const newLike = new SoundLikeUserModel({ userId, trackId });
                await newLike.save();

                res.status(200).json({ message: 'Добавлен в понравившиеся' });
            });
        } catch (e) {
            console.error('Ошибка при лайке трека:', e);
            res.status(500).json({ message: 'Ошибка при лайке трека' });
        }
    }
};