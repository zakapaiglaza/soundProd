import mongoose, { Schema, Document } from "mongoose";

interface SoundLikeUser {
    userId: string;
    trackId: string;
}

const SoundLikeUserSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    trackId: { type: Schema.Types.ObjectId, ref: 'Track', required: true }
});

const SoundLikeUserModel = mongoose.model<SoundLikeUser>('TrackLike', SoundLikeUserSchema);
export default SoundLikeUserModel;