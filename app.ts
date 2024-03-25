import express from 'express';
import { UserController } from './src/REST_FOR_ALBUM/UserController';
import { AlbumController } from './src/REST_FOR_ALBUM/AlbumsController';
import Start from './src/WORKERS/indexWorker';
import connectToMongo from './src/REST_FOR_DB/ConnectDB/db';
import { UserRoute } from './src/REST_FOR_DB/UserModules/RoutesForUser/UserRoutes';
import { AlbumRoute } from './src/REST_FOR_DB/AlbumModules/RoutesForAlbum/AlbumRoutes';
import { LikeSoundUser } from './src/REST_FOR_DB/AlbumModules/RoutesForAlbum/SoundLikeRoutes';
import { SoundRoute } from './src/REST_FOR_DB/AlbumModules/RoutesForAlbum/SoundRoutes';


const app = express();
const PORT = 3000;


const albumUrl = 'https://eternalstormdm.bandcamp.com/album/a-giant-bound-to-fall';
const outputFile = './data.json';


app.use(express.json());
app.use(UserRoute);
app.use(AlbumRoute);
app.use(LikeSoundUser);
app.use(SoundRoute);


app.post('/usersSupAlbum', UserController.getUsersSupAlbum);
app.post('/userAlbum', AlbumController.getUserAlbums);
app.post('/albumSound', AlbumController.getAlbumSound);



connectToMongo();
app.listen(PORT, async () => {
    console.log(`listening port on ${PORT}`);
    Start.configForStart(albumUrl, outputFile);
});

