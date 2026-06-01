import repo from '../repositories/user.repository';

class UserService {
    async getAllUsers(limit?: any, sort?: any, order?: any): Promise<any[]> {
        return await repo.findAll(limit, sort, order);
    }

    async getUserById(id: number): Promise<any> {
        return await repo.findById(id);
    }

    async createUser(data: any): Promise<any> {
        const newUser = {
            userName: data.userName ? data.userName.trim() : '',
            email: data.email
        };
        return await repo.create(newUser);
    }

    async updateUser(id: number, data: any): Promise<any> {
        return await repo.update(id, data);
    }

    async deleteUser(id: number): Promise<any> {
        return await repo.delete(id);
    }
}

export default new UserService();