import { Router } from "express";
import { SoundController } from "../AlbumController/SoundController";

const SoundRoute = Router();

SoundRoute.post('/sounds', SoundController.addSound);
SoundRoute.get('/sounds', SoundController.getAllSounds);

export { SoundRoute };