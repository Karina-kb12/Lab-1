import { Request, Response } from 'express';
import userService from '../services/user.service';
import { CreateUserRequestDto, UserResponseDto } from '../dtos/user.dto';

class UserController {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const { limit, sort, order } = req.query;
            const users = await userService.getAllUsers(limit, sort, order);
            res.json(users.map(u => new UserResponseDto(u)));
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getOne(req: Request, res: Response): Promise<void> {
        try {
            const user = await userService.getUserById(Number(req.params.id));
            if (!user) {
                res.status(404).json({ message: "Користувача не знайдено" });
                return;
            }
            res.json(new UserResponseDto(user));
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const dto = new CreateUserRequestDto(req.body);
            const newUser = await userService.createUser(dto);
            res.status(21).json(new UserResponseDto(newUser));
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const updated = await userService.updateUser(Number(req.params.id), req.body);
            res.json(new UserResponseDto(updated));
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async remove(req: Request, res: Response): Promise<void> {
        try {
            const result = await userService.deleteUser(Number(req.params.id));
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new UserController();