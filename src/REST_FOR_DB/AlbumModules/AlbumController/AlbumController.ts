

import { Request, Response } from "express";
import { ObjectId } from 'mongodb';
import { getDB } from "../../ConnectDB/db";
import { Album, Sound } from "../Album_interface/album_interface";


export class AddAlbumAndSound {

    static async createAlbum(req: Request, res: Response) {
        try {
            const db = getDB();
            const { title, artist, sound } = req.body;


            const newAlbum: Album = {
                title: title,
                artist: artist,
                sound: [],
                likeForUser: []
            };

            for (const trackData of sound) {
                const newSound: Sound = {
                    _id: new ObjectId(),
                    title: trackData.title,
                    url: trackData.url,
                };
                await db.collection('sounds').insertOne(newSound);
                newAlbum.sound.push(newSound);
            }

            await db.collection('albums').insertOne(newAlbum);

            res.status(200).json(newAlbum);
        } catch (error) {
            console.error('ошибка создания альбома:', error);
            res.status(500).json({ message: 'ошибка создания альбома' });
        }
    }

    static async deleteAlbum(req: Request, res: Response) {
        try {
            const db = getDB();
            const albumId = req.params.albumId;
            const result = await db.collection('albums').deleteOne({ _id: new ObjectId(albumId) });

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'альбом не найден' });
            }

            res.status(200).json({ message: 'альбом удален' });
        } catch (error) {
            console.error('ашибка удаления альбома:', error);
            res.status(500).json({ message: 'ашибка удаления альбома' });
        }
    }

    static async getAlbumSounds(req: Request, res: Response) {
        try {
            const db = getDB();
            const albumId = req.params.albumId;
            const album = await db.collection('albums').findOne({ _id: new ObjectId(albumId) });

            if (!album) {
                return res.status(404).json({ message: 'альбом не найден' });
            }

            res.status(200).json(album.sound);
        } catch (error) {
            console.error('ошибка получения треков альбома:', error);
            res.status(500).json({ message: 'ошибка получения треков альбома' });
        }
    }

}
