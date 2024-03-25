import { Router } from "express";
import { AddAlbumAndSound } from "../AlbumController/AlbumController";


const AlbumRoute = Router();

AlbumRoute.post('/albums', AddAlbumAndSound.createAlbum);
AlbumRoute.delete('/albums/:albumId', AddAlbumAndSound.deleteAlbum);
AlbumRoute.get('/albums/:albumId/tracks', AddAlbumAndSound.getAlbumSounds);



export { AlbumRoute };