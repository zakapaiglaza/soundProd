import mongoose, { Schema, Document } from 'mongoose';

export interface Sound extends Document {
    title: string;
    url: string;
};

const SoundSchema: Schema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true }
});

const SoundModel = mongoose.model<Sound>('Sound', SoundSchema);
export default SoundModel;