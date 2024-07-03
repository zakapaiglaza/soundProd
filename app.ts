import express from 'express';
import { connectToMongo } from './src/REST_FOR_DB/ConnectDB/db';
import { UserRoute } from './src/REST_FOR_DB/UserModules/RoutesForUser/UserRoutes';
import { AlbumRoute } from './src/REST_FOR_DB/AlbumModules/RoutesForAlbum/AlbumRoutes';
import { LikeSoundUser } from './src/REST_FOR_DB/AlbumModules/RoutesForAlbum/SoundLikeRoutes';
import { SoundRoute } from './src/REST_FOR_DB/AlbumModules/RoutesForAlbum/SoundRoutes';
import * as dotenv from 'dotenv';
import { WorkerRoutes } from './src/WORKERS/routWorker';




dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json());
app.use(UserRoute);
app.use(AlbumRoute);
app.use(LikeSoundUser);
app.use(SoundRoute);
app.use(WorkerRoutes);


connectToMongo()
    .then(() => {
        app.listen(PORT, async () => {
            console.log(`Listening on port ${PORT}`);
        });
    }).catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });


