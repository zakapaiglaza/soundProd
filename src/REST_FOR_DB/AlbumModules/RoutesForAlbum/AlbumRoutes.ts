import { Router } from "express";
import { AddAlbumAndSound } from "../AlbumController/AlbumController";
import { verifyToken } from "../../../JWT/jwt";

const AlbumRoute = Router();

AlbumRoute.post('/albums', verifyToken, AddAlbumAndSound.createAlbum);
AlbumRoute.delete('/albums/:albumId', verifyToken, AddAlbumAndSound.deleteAlbum);
AlbumRoute.get('/albums/:albumId/tracks', verifyToken, AddAlbumAndSound.getAlbumSounds);



export { AlbumRoute };