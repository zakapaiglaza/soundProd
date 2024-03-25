"use strict";
// import { UserParser } from "./Modules/UserParser";
// import { AlbumParser } from "./Modules/AlbumParser";
// import { write } from "./fs/fs";
// import { Worker, isMainThread, parentPort } from 'worker_threads';
// import { resolve } from "path";
// import { realpath } from "fs-extra";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
// export default class Start {
//     static async configForStart(albumUrl: string, outputFile: string) {
//         try {
//             const users = await UserParser.getUsersSupAlbum(albumUrl);
//             console.log('кто поддержали :>> ', users);
//             const dataAlbum: any = [];
//             for (const user of users) {
//                 const albums = await AlbumParser.getAlbums(user);
//                 console.log(`альбомы юзера ${user}:>> `, albums);
//                 for (const album of albums) {
//                     const sound = await AlbumParser.getAlbumSound(album.url);
//                     console.log(`треки в альбоме ${album.title}>> `, sound);
//                     dataAlbum.push({ user, album, sound });
//                 }
//             }
//             write(dataAlbum, outputFile);
//             return dataAlbum;
//         } catch (e) {
//             console.error('ошибка парсинга ', e);
//             throw e;
//         }
//     }
// }
// export default class Start {
//     static async configForStart(albumUrl: string, outputFile: string) {
//         if (isMainThread) {
//             const users = await UserParser.getUsersSupAlbum(albumUrl);
//             console.log('кто поддержал альбом:', users);
//             const userData: any[] = [];
//             const workerPromises: Promise<any>[] = [];
//             for (const user of users.slice(0, 10)) {
//                 workerPromises.push(new Promise<void>((resolve, reject) => {
//                     const worker = new Worker(__filename);
//                     worker.postMessage({ user, albumUrl });
//                     worker.on('message', (data) => {
//                         userData.push(data);
//                         resolve();
//                     });
//                     worker.on('error', (error) => {
//                         reject(error);
//                     });
//                 }));
//             }
//             await Promise.all(workerPromises);
//             write(userData, outputFile);
//             return userData;
//         } else {
//             parentPort?.on('message', async (message) => {
//                 const { user, albumUrl } = message;
//                 const albums = await AlbumParser.getAlbums(user);
//                 console.log(`альбомы пользователя ${user}:`);
//                 const userData: any[] = [];
//                 for (const album of albums) {
//                     const sound = await AlbumParser.getAlbumSound(album.url);
//                     console.log(`треки в альбоме пользователя ${sound}`, sound);
//                     userData.push({ user, album, sound });
//                 }
//                 parentPort?.postMessage(userData);
//             })
//         }
//     }
// }
// if (isMainThread) {
//     Start.configForStart('', '');
// }
// import { UserParser } from "./Modules/UserParser";
// import { AlbumParser } from "./Modules/AlbumParser";
// import { write } from "./fs/fs";
// import { Worker, isMainThread, parentPort } from 'worker_threads';
// import { resolve } from "path";
// import { realpath } from "fs-extra";
// export default class Start {
//     static async configForStart(albumUrl: string, outputFile: string) {
//         if (isMainThread) {
//             const users = await UserParser.getUsersSupAlbum(albumUrl);
//             console.log('Users who supported the album:', users);
//             const userData: any[] = [];
//             const workerPromises: Promise<any>[] = [];
//             for (const user of users.slice(0, 10)) {
//                 workerPromises.push(new Promise<void>((resolve, reject) => {
//                     const worker = new Worker(__filename);
//                     worker.postMessage({ user, albumUrl });
//                     worker.on('message', (data: any) => {
//                         userData.push(data);
//                         resolve();
//                     });
//                     worker.on('error', (error: any) => {
//                         reject(error);
//                     });
//                 }));
//             }
//             await Promise.all(workerPromises);
//             write(userData, outputFile);
//             return userData;
//         } else {
//             parentPort?.on('message', async (message: any) => {
//                 const { user, albumUrl } = message;
//                 const albums = await AlbumParser.getAlbums(user);
//                 console.log(`Albums of user ${user}:`, albums);
//                 const userData: any[] = [];
//                 for (const album of albums) {
//                     const sound = await AlbumParser.getAlbumSound(album.url);
//                     console.log(`Tracks in the album ${album.title}:`, sound);
//                     userData.push({ user, album, sound });
//                 }
//                 parentPort?.postMessage(userData);
//             });
//         }
//     }
// }
// if (!isMainThread) {
//     Start.configForStart('', '');
// }
const { UserParser } = require("./Modules/UserParser");
const { AlbumParser } = require("./Modules/AlbumParser");
const { write } = require("./fs/fs");
const { Worker, isMainThread, parentPort } = require('worker_threads');
const { resolve } = require("path");
const { realpath } = require("fs-extra");
const path = __importStar(require("path"));
class Start {
    static configForStart(albumUrl, outputFile) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isMainThread) {
                const users = yield UserParser.getUsersSupAlbum(albumUrl);
                console.log('Users who supported the album:', users);
                const userData = [];
                const workerPromises = [];
                for (const user of users.slice(0, 10)) {
                    workerPromises.push(new Promise((resolve, reject) => {
                        const workerPath = path.resolve(__dirname, './Workers', 'runWorker.js');
                        const worker = new Worker(workerPath);
                        worker.postMessage({ user, albumUrl });
                        worker.on('message', (data) => {
                            userData.push(data);
                            resolve();
                        });
                        worker.on('error', (error) => {
                            reject(error);
                        });
                    }));
                }
                yield Promise.all(workerPromises);
                write(userData, outputFile);
                return userData;
            }
            else {
                parentPort === null || parentPort === void 0 ? void 0 : parentPort.on('message', (message) => __awaiter(this, void 0, void 0, function* () {
                    const { user, albumUrl } = message;
                    const albums = yield AlbumParser.getAlbums(user);
                    console.log(`Albums of user ${user}:`, albums);
                    const userData = [];
                    for (const album of albums) {
                        const sound = yield AlbumParser.getAlbumSound(album.url);
                        console.log(`Tracks in the album ${album.title}:`, sound);
                        userData.push({ user, album, sound });
                    }
                    parentPort === null || parentPort === void 0 ? void 0 : parentPort.postMessage(userData);
                }));
            }
        });
    }
}
if (!isMainThread) {
    Start.configForStart('', '');
}
exports.default = Start;
