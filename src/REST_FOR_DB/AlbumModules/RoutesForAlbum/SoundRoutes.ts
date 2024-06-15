import { Router } from "express";
import { SoundController } from "../AlbumController/SoundController";
import { verifyToken } from "../../../JWT/jwt";

const SoundRoute = Router();

SoundRoute.post('/sounds', verifyToken, SoundController.addSound);
SoundRoute.get('/sounds', verifyToken, SoundController.getAllSounds);

export { SoundRoute };