import { Request, Response } from 'express';
import { UserParser } from '../MODULES/UserParser';


export class UserController {
    static async getUsersSupAlbum(req: Request, res: Response) {
        const albumUrl = req.body.albumUrl;

        try {
            const users = await UserParser.getUsersSupAlbum(albumUrl);
            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
