import Start from "./indexWorker";
import { Router } from "express";
import { verifyToken } from "./../JWT/jwt";


const WorkerRoutes = Router();

WorkerRoutes.post('/startParsing', verifyToken, async (req, res) => {
    try {
        const { albumUrl } = req.body;
        if (!albumUrl) {
            return res.status(400).json({ message: 'URL отсутствует' });
        }

        await Start.startParsingAndSave(albumUrl);

        res.status(200).json({ message: ' сохранения ' });
    } catch (error) {
        console.error('ошибка  парсинга :', error);
        res.status(500).json({ message: 'ошибка  сохранения' });
    }
});

export { WorkerRoutes }