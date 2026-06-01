export class CreateApprovalRequestDto {
    requestId: number;
    adminId: number;
    decision: string;

    constructor(data: any) {
        this.requestId = Number(data.requestId || data.request_id);
        this.adminId = Number(data.adminId || data.admin_id);
        this.decision = data.decision;
    }
}

export class ApprovalResponseDto {
    id: number;
    requestId: number;
    adminId: number;
    decision: string;
    createdAt: string;

    constructor(entity: any) {
        this.id = entity.id;
        this.requestId = entity.requestId || entity.request_id;
        this.adminId = entity.adminId || entity.admin_id;
        this.decision = entity.decision;
        this.createdAt = entity.createdAt || entity.decision_date;
    }
}