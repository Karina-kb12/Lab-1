import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import { initDb } from './db/initDb';
import logger from './middleware/logger.middleware';

import accessRequestRoutes from './routes/accessRequest.routes';
import userRoutes from './routes/user.routes';
import approvalRoutes from './routes/approval.routes';
import { centralErrorHandler } from "./middleware/error.middleware";

import authRouter from './routes/auth.routes';

const app = express();
const PORT = 3000;

app.use(logger);

app.use(cors({
    origin: 'http://127.0.0.1:5500', 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Demo-UserId']
}));

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

app.use(express.json()); 

app.use('/api/v1/access-requests', accessRequestRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/approvals', approvalRoutes);

app.use(centralErrorHandler);

app.use('/api/v1/auth', authRouter);

initDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`\x1b[32m%s\x1b[0m`, `API Сервер запущено на http://localhost:${PORT}`);
        });
    })
    .catch((err: any) => {
        console.error("Помилка ініціалізації БД:", err.message);
        process.exit(1);
    });