import { UserParser } from "../MODULES/UserParser";
import { Worker } from 'worker_threads';

export default class Start {
    static async configForStart(albumUrl: string, outputFile: string) {

        try {
            const users = await UserParser.getUsersSupAlbum(albumUrl);
            // console.log(`поддержавшие альбом ${users}`);

            const promises: Promise<void>[] = [];

            for (const user of users) {
                const worker = new Worker(".\\src\\Workers\\worker.js", {
                    workerData: {
                        path: './runWorker.ts'
                    }
                });
                const data = new Promise<void>((resolve, reject) => {
                    worker.on('error', reject);
                    worker.on('exit', resolve);
                })

                worker.postMessage({ user, albumUrl, outputFile });
                promises.push(data);
            }

            await Promise.all(promises);
        } catch (e) {
            console.error('ошибка парсинга ', e);
            throw e;
        }
    }

}

