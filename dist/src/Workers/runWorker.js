"use strict";
// import { resolve } from 'path';
// import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// export default class UserWorker {
//     static run(user: string) {
//         return new Promise((resolve, reject) => {
//             const worker = new Worker(__filename, { workerData: { user } });
//             worker.on('message', (message) => {
//                 resolve(message);
//             })
//             worker.on('err', (err) => {
//                 reject(err);
//             })
//             worker.on('exit', (code) => {
//                 if (code !== 0) {
//                     reject(new Error(`воркер не працюе ${code}`));
//                 }
//             })
//         })
//     }
//     static processData(user: string) {
//         console.log(`данные поддержавшего альбом ${user}`);
//         return { user, result: `данные поддержавшего альбом ${user}` }
//     }
// }
// if (!isMainThread) {
//     const { user } = workerData;
//     const result = UserWorker.processData(user);
//     parentPort?.postMessage(result);
// }
const { parentPort } = require('worker_threads');
const { AlbumParser } = require('../Modules/AlbumParser');
parentPort.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, albumUrl } = message;
    const albums = yield AlbumParser.getAlbums(user);
    console.log(`Albums of user ${user}:`, albums);
    const userData = [];
    for (const album of albums) {
        const sound = yield AlbumParser.getAlbumSound(album.url);
        console.log(`Tracks in the album ${album.title}:`, sound);
        userData.push({ user, album, sound });
    }
    parentPort.postMessage(userData);
}));
