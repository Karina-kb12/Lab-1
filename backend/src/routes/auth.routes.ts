import { Router } from 'express';
import { login, logout } from '../controllers/auth.controller';
import rateLimit from 'express-rate-limit';

const authRouter = Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { code: 429, message: "Забагато спроб входу. Спробуйте пізніше" }
});

authRouter.post('/login', loginLimiter, login);
authRouter.post('/logout', logout);

export default authRouter;