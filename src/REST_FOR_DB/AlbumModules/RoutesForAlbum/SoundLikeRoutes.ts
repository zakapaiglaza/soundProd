import { Router } from "express";
import { SoundLikeController } from "../AlbumController/AlbumLikeController";
import { verifyToken } from "../../../JWT/jwt";

const LikeSoundUser = Router();

LikeSoundUser.post('/tracks/:trackId/like/:userId', verifyToken, SoundLikeController.SoundLikeUser);

export { LikeSoundUser };