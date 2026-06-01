export class CreateAccessRequestDto {
    userName: string;
    date: string;
    accessType: string;
    comments: string;

    constructor(data: any) {
        this.userName = data.userName || data.user_name;
        this.date = data.date;
        this.accessType = data.accessType || data.access_type;
        this.comments = data.comments || "";
    }
}

export class UpdateAccessRequestDto {
    date?: string;
    accessType?: string;
    comments?: string;
    status?: string;

    constructor(data: any) {
        this.date = data.date;
        this.accessType = data.accessType || data.access_type;
        this.comments = data.comments;
        this.status = data.status;
    }
}

export class AccessRequestResponseDto {
    id: number;
    userName: string;
    date: string;
    accessType: string;
    comments: string;
    status: string;

    constructor(entity: any) {
        this.id = entity.id;
        this.userName = entity.userName || entity.user_name;
        this.date = entity.date;
        this.accessType = entity.accessType || entity.access_type;
        this.comments = entity.comments || "";
        this.status = entity.status || "Pending";
    }
}