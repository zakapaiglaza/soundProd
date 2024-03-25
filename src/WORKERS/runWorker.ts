import { parentPort } from 'worker_threads';
import { AlbumParser } from '../MODULES/AlbumParser';
import { write } from '../FS/fs';


parentPort?.on('message', async (message) => {
    const { user, outputFile } = message;

    try {
        const albums = await AlbumParser.getAlbums(user);
        // console.log(`альбомы юзера ${user}`, albums);

        for (const album of albums) {
            const sound = await AlbumParser.getAlbumSound(album.url);
            // console.log(`треки в альбоме ${album.title}`, sound);

            await write({ user, album, sound }, outputFile);
        }
    } catch (e) {
        console.error('ошибка парсинга', e);
    }
})