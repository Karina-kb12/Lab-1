const db = require('../db');
class UserRepository {
    findAll() {
        return db.users;
    }
    findById(id) {
        return db.users.find(u => u.id === id);
    }
    create(user) {
        db.users.push(user);
        return user;
    }
}
module.exports = new UserRepository();