import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { verifyPassword } from '../utils/auth.utils';
import { db } from '../db/db';

const JWT_SECRET = 'super-secret-key-knu-2026';

interface UserRow {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    password_salt: string;
    role: string;
}

export function login(req: Request, res: Response, next: NextFunction): void {
    const { userName, password } = req.body;

    db.get(
        `SELECT id, name, email, password_hash, password_salt, role FROM Users WHERE name = ?`,
        [userName],
        (err: Error | null, row: any) => {
            if (err) {
                return next(err);
            }

            const user = row as UserRow | undefined;

            if (!user || !verifyPassword(password, user.password_hash, user.password_salt)) {
                res.status(401).json({ code: 401, message: "Невірні облікові дані" });
                return;
            }

            const token = jwt.sign(
                { userId: user.id, role: user.role },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({
                token,
                user: { id: user.id, userName: user.name, role: user.role }
            });
        }
    );
}

export function logout(req: Request, res: Response): void {
    res.json({ message: "Успішно вийшли з системи" });
}