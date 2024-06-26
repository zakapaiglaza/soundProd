
import { Worker } from 'worker_threads';
import { getDB } from '../REST_FOR_DB/ConnectDB/db';
import { UserParser } from "../MODULES/UserParser";
import * as dotenv from 'dotenv';
dotenv.config();

export default class Start {
    static async configForStart(albumUrl: string): Promise<void> {
        try {
            const db = getDB();
            const users = await UserParser.getUsersSupAlbum(albumUrl);
            const promises: Promise<void>[] = [];

            for (const user of users) {
                const worker = new Worker(process.env.WORKER_PATH_FILE!, {
                    workerData: {
                        path: './runWorker.ts'
                    }
                });

                const dataPromise = new Promise<void>((resolve, reject) => {
                    worker.on('error', reject);
                    worker.on('exit', resolve);
                    worker.on('message', async (message) => { });
                });

                worker.postMessage({ user, albumUrl });

                promises.push(dataPromise);
            }

            await Promise.all(promises);
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    static async startParsingAndSave(url: string): Promise<void> {
        await this.configForStart(url);
    }
}
