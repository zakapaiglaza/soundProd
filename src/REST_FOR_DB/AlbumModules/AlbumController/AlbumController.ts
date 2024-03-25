import { Request, Response } from "express";
import AlbumModule from "../Album_interface/album_interface";
import SoundModel from "../Album_interface/SoundInterface";


export class AddAlbumAndSound {

    static async createAlbum(req: Request, res: Response) {
        try {
            const { title, artist, sound } = req.body;


            const newAlbum = new AlbumModule({
                title: title,
                artist: artist,
                sound: [],
            });


            for (const trackData of sound) {
                const newSound = new SoundModel({
                    title: trackData.title,
                    url: trackData.url,
                });
                await newSound.save();

                newAlbum.sound.push(newSound._id);
            }


            const saveData = await newAlbum.save();
            const albumId = saveData._id;
            console.log(albumId, 'albumId')
            res.status(200).json(saveData);
        } catch (e) {
            console.error('ошибка создания альбома:', e);
            res.status(500).json({ message: 'ошибка создания альбома' });
        }
    }

    static async deleteAlbum(req: Request, res: Response) {
        try {
            const albumId = req.params.albumId;
            console.log('albumId:', albumId);

            const deleteAlbum = await AlbumModule.findByIdAndDelete(albumId);

            if (!deleteAlbum) {
                return res.status(400).json({ message: 'нету такого альбома' });
            }

            res.status(200).json({ message: 'альбом удален' });
        } catch (e) {
            console.error('ошибка удаления альома');
            res.status(500).json({ message: 'ошибка удаления' });
        }
    }

    static async getAlbumSounds(req: Request, res: Response) {
        try {
            const albumId = req.params.albumId;

            console.log(' альбом ID:', albumId);

            const album = await AlbumModule.findById(albumId);

            if (!album) {
                return res.status(404).json({ message: 'Альбом не найден' });
            }

            const sounds = album.sound;
            res.status(200).json(sounds);
        } catch (e) {
            console.error('ошибка получения треков альбома:', e);
            res.status(500).json({ message: 'ошибка получения треков альбома' });
        }
    }


}