"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumParser = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
class AlbumParser {
    static getAlbums(userUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield axios_1.default.get(userUrl)
                .then(res => {
                const html = res.data;
                const $ = cheerio_1.default.load(html);
                const albumsBox = $('#collection-items > ol');
                const albums = [];
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
        });
    }
    static getAlbumSound(albumUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield axios_1.default.get(albumUrl)
                .then(response => {
                const html = response.data;
                const $ = cheerio_1.default.load(html);
                const songsBox = $('#track_table');
                const sound = [];
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
        });
    }
}
exports.AlbumParser = AlbumParser;
