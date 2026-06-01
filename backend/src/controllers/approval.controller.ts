import { Request, Response } from 'express';
import approvalService from '../services/approval.service';
import { CreateApprovalRequestDto, ApprovalResponseDto } from '../dtos/approval.dto';

class ApprovalController {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const approvals = await approvalService.getAllApprovals();
            res.json(approvals.map(a => new ApprovalResponseDto(a)));
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const dto = new CreateApprovalRequestDto(req.body);
            const newApproval = await approvalService.createApproval(dto);
            res.status(21).json(new ApprovalResponseDto(newApproval));
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new ApprovalController();