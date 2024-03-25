import { Request, Response } from 'express';
import { AlbumParser } from '../MODULES/AlbumParser';


export class AlbumController {
    static async getUserAlbums(req: Request, res: Response) {
        const userUrl = req.body.userUrl;

        try {
            const albums = await AlbumParser.getAlbums(userUrl);
            res.status(200).json(albums);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAlbumSound(req: Request, res: Response) {
        const albumUrl = req.body.albumUrl;

        try {
            const sound = await AlbumParser.getAlbumSound(albumUrl);
            res.status(200).json(sound);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
