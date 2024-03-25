"use strict";
// import express from 'express';
// import { UserController } from './src/REST/UserController';
// import { AlbumController } from './src/REST/AlbumsController';
// import Start from './src';
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
// const app = express();
// const PORT = 3000;
// const albumUrl = 'https://eternalstormdm.bandcamp.com/album/a-giant-bound-to-fall';
// const outputFile = './data.json';
// app.use(express.json());
// app.post('/usersSupAlbum', UserController.getUsersSupAlbum);
// app.post('/userAlbum', AlbumController.getUserAlbums);
// app.post('/albumSound', AlbumController.getAlbumSound);
// app.listen(PORT, async () => {
//     console.log(`listening port on ${PORT}`);
//     Start.configForStart(albumUrl, outputFile);
// });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./src/index"));
const app = (0, express_1.default)();
const PORT = 3000;
const albumUrl = 'https://eternalstormdm.bandcamp.com/album/a-giant-bound-to-fall';
const outputFile = './data.json';
app.use(express_1.default.json());
app.post('/processUsers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield index_1.default.configForStart(albumUrl, outputFile);
        res.status(200).json({ message: 'данные успешно получены ' });
    }
    catch (e) {
        console.error('ошибка парсинга данных :', e);
        res.status(500).json({ e: 'ошибка парсинга данных юзера' });
    }
}));
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`listening port on ${PORT}`);
}));
