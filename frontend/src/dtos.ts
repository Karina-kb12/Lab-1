export interface CreateAccessRequestDto {
    userId: number;
    userName: string;
    date: string;
    accessType: string;
    comments: string;
    status: string;
}

export interface AccessRequestDto extends CreateAccessRequestDto {
    id: number;
}

export interface ApiError {
    code: number;
    message: string;
}