const repository = require('../repositories/approval.repository');
const requestRepo = require('../repositories/accessRequest.repository');

class ApprovalService {
    async getAllApprovals() {
        return await approvalRepo.findAll();
    }

    async createApproval(data) {
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
            comments: data.comment 
        });

        return await approvalRepo.create(newApproval);
    }
}

module.exports = new ApprovalService();