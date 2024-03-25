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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumController = void 0;
const AlbumParser_1 = require("../Modules/AlbumParser");
class AlbumController {
    static getUserAlbums(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userUrl = req.body.userUrl;
            try {
                const albums = yield AlbumParser_1.AlbumParser.getAlbums(userUrl);
                res.status(200).json(albums);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    static getAlbumSound(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const albumUrl = req.body.albumUrl;
            try {
                const sound = yield AlbumParser_1.AlbumParser.getAlbumSound(albumUrl);
                res.status(200).json(sound);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.AlbumController = AlbumController;
