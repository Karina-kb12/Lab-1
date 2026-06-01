export class CreateUserRequestDto {
    userName: string;
    email: string;

    constructor(data: any) {
        this.userName = data.userName || data.name;
        this.email = data.email || 'student@knu.ua';
    }
}

export class UserResponseDto {
    id: number;
    userName: string;

    constructor(user: any) {
        this.id = user.id;
        this.userName = user.name || user.userName;
    }
}