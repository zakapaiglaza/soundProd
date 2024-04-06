import bcrypt from 'bcrypt';
import { getDB } from '../../ConnectDB/db';
import { Request, Response } from 'express';
import { generateToken } from '../../../JWT/jwt';


export async function registration(req: Request, res: Response) {
    try {
        const db = getDB();
        const { name, password } = req.body;

        const usersCollection = db.collection('users');
        const existingUser = await usersCollection.findOne({ name });

        if (existingUser) {
            return res.status(400).json({ message: 'Такой ник уже есть' });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const result = await usersCollection.insertOne({ name, password: hashPassword });

        if (result && result.insertedId) {
            console.log('зареган!');
            res.status(200).json({ message: 'юзер зареган' });
        } else {
            throw new Error('не удалось зарегать пользователя');
        }
    } catch (error) {
        console.error('ошибка регистрации:', error);
        res.status(500).json({ message: 'ошибка регистрации' });
    }
}

export async function loginUser(req: Request, res: Response) {
    try {
        const db = getDB();
        const { name, password } = req.body;

        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ name });

        if (!user) {
            throw new Error('такого юзера нету');
        }

        const isValidPass = await bcrypt.compare(password, user.password);

        if (!isValidPass) {
            throw new Error('миша все хуйня , давай по новой');
        }

        console.log('залогинился ', user);
        const token = generateToken({ _id: user._id, name: user.name });
        res.status(200).json({ _id: user._id, name: user.name, token });
    } catch (error) {
        console.error('ошибка авторизации:', error);
        res.status(500).json({ message: 'ошибка авторизации' });
    }
}


