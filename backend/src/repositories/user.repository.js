const { all, get, run } = require('../db/dbClient');

class UserRepository {
    async findAll(limit = 10, sort = 'name', order = 'ASC') {
        const sql = `SELECT * FROM Users WHERE 1=1 ORDER BY ${sort} ${order} LIMIT ${limit}`;
        return await all(sql);
    }

    async findById(id) {
        return await get(`SELECT * FROM Users WHERE id = ${id}`);
    }

    async create(user) {
        const sql = `INSERT INTO Users (name, email, role) 
                     VALUES ('${user.userName}', '${user.email || 'student@knu.ua'}', 'Student')`;
        const result = await run(sql);
        
        return {
            id: result.id,
            userName: user.userName,
            email: user.email || 'student@knu.ua'
        };
    }

    async update(id, data) {
        const sql = `UPDATE Users SET name = '${data.userName}', email = '${data.email}' WHERE id = ${id}`;
        await run(sql);
        return { id, ...data };
    }

    async delete(id) {
        const sql = `DELETE FROM Users WHERE id = ${id}`;
        await run(sql);
        return { message: "Користувача видалено", id };
    }
}

module.exports = new UserRepository();