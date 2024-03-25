import mongoose, { Schema, Document } from 'mongoose';

interface Album extends Document {
    title: string;
    artist: string;
    sound: Sound[];
    likeForUser: mongoose.Types.ObjectId[];
}

interface Sound {
    title: string;
    url: string;
}


// const SoundSchema: Schema = new Schema({
//     title: { type: String, required: true },
//     url: { type: String, required: true }
// })

const AlbumSchema: Schema = new Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    // sound: { SoundSchema },
    sound: [{ type: Schema.Types.ObjectId, ref: 'Sound' }],
    likeForUser: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

const AlbumModule = mongoose.model<Album>('Album', AlbumSchema);
export default AlbumModule;