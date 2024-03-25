import { Router } from "express";
import { SoundLikeController } from "../AlbumController/AlbumLikeController";

const LikeSoundUser = Router();

LikeSoundUser.post('/tracks/:trackId/like/:userId', SoundLikeController.SoundLikeUser);

export { LikeSoundUser };