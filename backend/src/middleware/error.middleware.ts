import { Request, Response, NextFunction } from "express";

export function centralErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const status = err.status || 500;

    res.status(status).json({
        code: status,
        message: err.message || "Внутрішня помилка сервера"
    });
}