class CreateAccessRequestDto {
    constructor(data) {
        this.userName = data.userName;
        this.date = data.date;
        this.accessType = data.accessType;
        this.comments = data.comments || "";
    }
}

class UpdateAccessRequestDto {
    constructor(data) {
        this.date = data.date;
        this.accessType = data.accessType;
        this.comments = data.comments;
        this.status = data.status;
    }
}

class AccessRequestResponseDto {
    constructor(entity) {
        this.id = entity.id;
        this.userName = entity.userName;
        this.date = entity.date;
        this.accessType = entity.accessType;
        this.comments = entity.comments;
        this.status = entity.status;
    }
}

module.exports = { 
    CreateAccessRequestDto, 
    UpdateAccessRequestDto, 
    AccessRequestResponseDto 
};