import bcrypt from 'bcrypt';
import User from '../User_Interface/users';
import { userBD } from '../User_Interface/users';

export async function registration(name: string, password: string): Promise<userBD | null> {
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, password: hashPassword });
        console.log('зареган!', user);
        return user;
    } catch (e) {
        console.error('не удалось зарегать: ', e);
        throw e;
    }
}

export async function loginUser(name: string, password: string): Promise<userBD | null> {
    try {
        const user = await User.findOne({ name });
        if (!user) {
            throw new Error('нету такого');
        }
        const isValidPass = await bcrypt.compare(password, user.password);
        if (!isValidPass) {
            throw new Error('пароль не тот давай по новой !:)');
        }
        console.log('залогинился ', user);
        return user
    } catch (e) {
        console.error('не удалось залогиниться', e);
        throw e;
    }
}