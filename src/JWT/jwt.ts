import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secretKey = 'shmalBanka2455Plotna';


interface ExtendedReq extends Request {
    user?: any;
}


export function generateToken(data: any): string {
    return jwt.sign(data, secretKey, { expiresIn: '24h' });
}


export function verifyToken(req: ExtendedReq, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: 'нету токена' });
    }

    jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ message: 'неверный токен' });
        }
        req.user = decoded;
        next();
    });
}
