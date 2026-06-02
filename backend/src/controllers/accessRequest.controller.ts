import { Request, Response, NextFunction } from 'express';
import accessRequestService from '../services/accessRequest.service';
import { CreateAccessRequestDto, UpdateAccessRequestDto, AccessRequestResponseDto } from '../dtos/accessRequest.dto';

class AccessRequestController {
    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const currentUserId = (req as any).userId;
            const queryParams = { ...req.query, userId: currentUserId };
            
            const requests = await accessRequestService.getAllRequests(queryParams);
            const dtos = requests.map(req => new AccessRequestResponseDto(req));
            res.json(dtos);
        } catch (error: any) {
            next(error);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const requestId = Number(req.params.id);
            const currentUserId = (req as any).userId;

            const request = await accessRequestService.getById(requestId, currentUserId);
            
            if (!request) {
                res.status(403).json({ code: 403, message: "Доступ заборонено: Ви не є власником цієї заявки" });
                return;
            }
            
            res.json(request);
        } catch (error: any) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const currentUserId = (req as any).userId;
        
        const bodyWithUser = { 
            ...req.body, 
            userId: currentUserId,
            user_id: currentUserId,
            user_name: req.body.userName || req.body.user_name
        };
        
        const dto = new CreateAccessRequestDto(bodyWithUser);
        const newRequest = await accessRequestService.createRequest(dto);
            res.status(201).json(new AccessRequestResponseDto(newRequest));
        } catch (error: any) {
        next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const requestId = Number(req.params.id);
            const currentUserId = (req as any).userId;

            const request = await accessRequestService.getById(requestId, currentUserId);
            if (!request) {
                res.status(403).json({ code: 403, message: "Доступ заборонено: Ви не можете редагувати чужу заявку" });
                return;
            }

            const dto = new UpdateAccessRequestDto(req.body);
            const updated = await accessRequestService.updateRequest(requestId, dto);
            if (!updated) {
                res.status(404).json({ code: 404, message: "Заявку не знайдено для оновлення" });
                return;
            }
            res.json(new AccessRequestResponseDto(updated));
        } catch (error: any) {
            next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const requestId = Number(req.params.id);
            const currentUserId = (req as any).userId;

            const request = await accessRequestService.getById(requestId, currentUserId);
            if (!request) {
                res.status(403).json({ code: 403, message: "Доступ заборонено: Ви не можете видалити чужу заявку" });
                return;
            }

            const deleted = await accessRequestService.deleteRequest(requestId);
            if (!deleted) {
                res.status(404).json({ code: 404, message: "Заявку не знайдено" });
                return;
            }
            res.json({ message: "Заявку успішно видалено" });
        } catch (error: any) {
            next(error);
        }
    }
}

export default new AccessRequestController();