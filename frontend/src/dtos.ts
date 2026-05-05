export interface AccessRequestDto {
    id: number;
    user_id: number;
    user_name: string;
    date: string;
    access_type: string;
    comments: string;
    status: string;
}

export interface ApiError {
    status: number;
    message: string;
    details?: string;
}
export interface CreateAccessRequestDto {
    user_id: number;
    user_name: string;
    date: string;
    access_type: string;
    comments: string
    status: string;
}

export interface AccessRequestDto extends CreateAccessRequestDto {
    id: number;
}