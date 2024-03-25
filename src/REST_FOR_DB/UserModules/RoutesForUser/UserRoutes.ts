import { Request, Response, Router } from "express";
import { registration, loginUser } from "../Registr_&_Auth/Regist_&_Auth";
import { generateToken, verifyToken } from "../../../JWT/jwt";


const UserRoute = Router();

UserRoute.post('/register', async (req: Request, res: Response) => {
    const { name, password } = req.body;
    try {
        const user = await registration(name, password);

        res.status(200).json(user)
    } catch (e) {
        console.error('ошибка регистрации:', e);
        res.status(500).json({ message: 'ошибка регистрации' });
    }
})

UserRoute.post('/login', async (req: Request, res: Response) => {
    const { name, password } = req.body;
    try {
        const user = await loginUser(name, password);
        const token = generateToken({ name: user?.name });
        res.status(200).json({ user, token });
    } catch (e) {
        console.error('ошибка авторизации:', e);
        res.status(500).json({ message: 'ошибка авторизации:' });
    }
})

export { UserRoute };