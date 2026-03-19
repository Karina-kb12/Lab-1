const approvalRepo = require('../repositories/approval.repository');
const requestRepo = require('../repositories/accessRequest.repository');
const { v4: uuidv4 } = require('uuid');
class ApprovalService {
    getAllApprovals() {
        return approvalRepo.findAll();
    }
    createApproval(data) {
        const request = requestRepo.findById(data.requestId);
        if (!request) {
            throw new Error("Заявку з таким ID не знайдено");
        }
        const newApproval = {
            id: uuidv4(),
            requestId: data.requestId,
            adminId: data.adminId,
            decision: data.decision,
            comment: data.comment || "",
            createdAt: new Date().toISOString()
        };
        requestRepo.update(data.requestId, { status: data.decision });
        return approvalRepo.create(newApproval);
    }
}
module.exports = new ApprovalService();