const repo = require('../repositories/user.repository');

class UserService {
    async getAllUsers(limit, sort, order) {
        return await repo.findAll(limit, sort, order);
    }

    async getUserById(id) {
        return await repo.findById(id);
    }

    async createUser(data) {
        const newUser = {
            userName: data.userName.trim(),
            email: data.email
        };
        return await repo.create(newUser);
    }

    async updateUser(id, data) {
        return await repo.update(id, data);
    }

    async deleteUser(id) {
        return await repo.delete(id);
    }
}

module.exports = new UserService();