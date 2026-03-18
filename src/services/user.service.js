const repo = require('../repositories/user.repository');
const { v4: uuidv4 } = require('uuid');
class UserService {
    getAllUsers() {
        return repo.findAll();
    }
    getUserById(id) {
        return repo.findById(id);
    }
    createUser(data) {
        const newUser = {
            id: uuidv4(),
            userName: data.userName.trim()
        };
        return repo.create(newUser);
    }
}
module.exports = new UserService();