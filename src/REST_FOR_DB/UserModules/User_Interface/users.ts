import { Schema, model, Document } from 'mongoose';

export interface userBD extends Document {
    name: string;
    password: string;
}

const userSchema = new Schema<userBD>({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const User = model<userBD>('User', userSchema);
export default User;