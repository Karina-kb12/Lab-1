class CreateUserRequestDto {
    constructor(data) {
        this.userName = data.userName;
        this.email = data.email;
    }
}

class UserResponseDto {
    constructor(user) {
        this.id = user.id;
        this.userName = user.name || user.userName;
    }
}

module.exports = { CreateUserRequestDto, UserResponseDto };