class CreateApprovalRequestDto {
    constructor(data) {
        this.requestId = data.requestId;
        this.adminId = data.adminId;
        this.decision = data.decision;
    }
}

class ApprovalResponseDto {
    constructor(entity) {
        this.id = entity.id;
        this.requestId = entity.requestId;
        this.adminId = entity.adminId;
        this.decision = entity.decision;
        this.createdAt = entity.createdAt;
    }
}

module.exports = { CreateApprovalRequestDto, ApprovalResponseDto };