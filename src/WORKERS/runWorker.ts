import { parentPort } from 'worker_threads';
import { AlbumParser } from '../MODULES/AlbumParser';
import { connectToMongo, getDB } from '../REST_FOR_DB/ConnectDB/db';
import { Album, Sound, AlbumP, SoundP } from '../REST_FOR_DB/AlbumModules/Album_interface/album_interface';


connectToMongo()
    .then(() => {

        parentPort?.on('message', async (message) => {
            const { user } = message;

            try {
                const albumsP: AlbumP[] = await AlbumParser.getAlbums(user);

                if (albumsP.length === 0) {
                    console.error('ошибка при получении альбомов юзера ');
                    return;
                }

                for (const albumP of albumsP) {
                    const soundP: SoundP[] = await AlbumParser.getAlbumSound(albumP.url);


                    const album: Album = {
                        title: albumP.title,
                        artist: albumP.artist,
                        sound: soundP.map((soundItemP) => {
                            return {
                                title: soundItemP.title,
                                url: soundItemP.url,
                            };
                        }),
                        likeForUser: []
                    };
                    await albumSave(album, album.sound);
                }

                parentPort?.postMessage({ success: true });
            } catch (error) {
                console.error('хз че за ошибка:', error);
            }
        });
    })
    .catch(error => {
        console.error('ошибка подключения к MongoDB:', error);
    });

async function albumSave(album: Album, sound: Sound[]): Promise<Album | undefined> {
    try {
        const db = getDB();

        const albumCollection = db.collection('albums');
        const soundCollection = db.collection('sounds');

        const res = await albumCollection.insertOne(album);

        if (!res || !res.insertedId) {
            console.error('ошибка сохранения альбома');
            return undefined;
        }

        const soundID = [];
        for (const soundItem of sound) {
            const soundRes = await soundCollection.insertOne(soundItem);
            if (soundRes && soundRes.insertedId) {
                soundID.push(soundRes.insertedId);
            } else {
                console.error('ошибка при сохранении трека');
            }
        }
    } catch (e) {
        console.error('ошибка записи в монго', e);
        return undefined;
    }
}


