
import express from 'express';
import Start from './src/WORKERS/indexWorker';
import { connectToMongo } from './src/REST_FOR_DB/ConnectDB/db';
import { UserRoute } from './src/REST_FOR_DB/UserModules/RoutesForUser/UserRoutes';
import { AlbumRoute } from './src/REST_FOR_DB/AlbumModules/RoutesForAlbum/AlbumRoutes';
import { LikeSoundUser } from './src/REST_FOR_DB/AlbumModules/RoutesForAlbum/SoundLikeRoutes';
import { SoundRoute } from './src/REST_FOR_DB/AlbumModules/RoutesForAlbum/SoundRoutes';


const app = express();
const PORT = 3000;

const albumUrl = 'https://eternalstormdm.bandcamp.com/album/a-giant-bound-to-fall';


app.use(express.json());
app.use(UserRoute);
app.use(AlbumRoute);
app.use(LikeSoundUser);
app.use(SoundRoute);



connectToMongo()
    .then(() => {
        app.listen(PORT, async () => {
            console.log(`Listening on port ${PORT}`);

            await Start.configForStart(albumUrl);
        });
    }).catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });
