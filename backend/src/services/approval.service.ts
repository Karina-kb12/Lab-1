import approvalRepository from '../repositories/approval.repository';
import requestRepo from '../repositories/accessRequest.repository';

class ApprovalService {
    async getAllApprovals(): Promise<any[]> {
        return await approvalRepository.findAll();
    }

    async createApproval(data: { requestId: number; adminId: number; decision: string; comment?: string }): Promise<any> {
        const request = await requestRepo.findById(data.requestId);
        
        if (!request) {
            throw new Error("Заявку з таким ID не знайдено");
        }

        const newApproval = {
            requestId: data.requestId,
            adminId: data.adminId,
            decision: data.decision,
            comment: data.comment || ""
        };

        await requestRepo.update(data.requestId, { 
            status: data.decision, 
            comments: data.comment || "" 
        });

        return await approvalRepository.create(newApproval);
    }
}

export default new ApprovalService();