import axios from 'axios';
import cheerio from 'cheerio';
import { AlbumP, SoundP } from '../REST_FOR_DB/AlbumModules/Album_interface/album_interface';


export class AlbumParser {
    static async getAlbums(userUrl: string): Promise<AlbumP[]> {
        return await axios.get(userUrl)
            .then(res => {
                const html = res.data;
                const $ = cheerio.load(html);

                const albumsBox = $('#collection-items > ol');
                const albums: AlbumP[] = [];

                albumsBox.find('li.collection-item-container').each((index, element) => {
                    const albumElement = $(element);
                    const titleText = albumElement.find('.collection-item-title').text().trim();
                    const artistText = albumElement.find('.collection-item-artist').text().trim();
                    const imageSrc = albumElement.find('.collection-item-art').attr('src') || '';

                    const titleMatch = titleText.match(/^(.*?)(\n|$)/);
                    const artistMatch = artistText.match(/by\s+(.*)/);

                    const title = titleMatch ? titleMatch[1] : '';
                    const artist = artistMatch ? artistMatch[1] : '';
                    const albumUrl = albumElement.find('.item-link').attr('href') || '';

                    albums.push({ title, artist, image: imageSrc, url: albumUrl });
                });

                return albums;
            })
            .catch(error => {
                throw error;
            });
    }

    static async getAlbumSound(albumUrl: string): Promise<SoundP[]> {
        return await axios.get(albumUrl)
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html);

                const songsBox = $('#track_table');
                const sound: SoundP[] = [];

                songsBox.find('.track_row_view').each((index, element) => {
                    const songElement = $(element);
                    const titleText = songElement.find('.title-col').text().trim();
                    const titleMatch = titleText.match(/^(.*?)(\n|$)/);
                    const title = titleMatch ? titleMatch[1] : '';

                    const soundUrl = songElement.find('.title-col a').attr('href') || '';

                    const finalURL = new URL(soundUrl, albumUrl).href;

                    sound.push({ title, url: finalURL });

                });

                return sound;
            })
            .catch(error => {
                throw error;
            });
    }
}
