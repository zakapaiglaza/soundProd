import mongoose from 'mongoose';

async function connectToMongo(): Promise<void> {
    try {
        await mongoose.connect('mongodb://localhost:27017/musicParser');
        console.log('mongo connected');
    } catch (error) {
        console.error('connection error:', error);
        throw error;
    }
}

export default connectToMongo;
