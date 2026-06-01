import { all, get, run } from '../db/dbClient';

class UserRepository {
    async findAll(limit: any = 10, sort: any = 'name', order: any = 'ASC'): Promise<any> {
        const sql = `SELECT * FROM Users WHERE 1=1 ORDER BY ${sort} ${order} LIMIT ${limit}`;
        return await all(sql);
    }
    async findById(id: any): Promise<any> {
    return await get(`SELECT * FROM Users WHERE id = ?`, [id]);
    }

    async create(user: any): Promise<any> {
        const defaultEmail = user.email || 'student@knu.ua';
        const sql = `INSERT INTO Users (name, email, role) VALUES ('${user.userName}', '${defaultEmail}', 'Student')`;
        const result = await run(sql);
        return { id: result.lastID, name: user.userName, email: defaultEmail, role: 'Student' };
    }

    async update(id: any, data: any): Promise<any> {
        const sql = `UPDATE Users SET name = '${data.userName}', email = '${data.email}' WHERE id = ${id}`;
        await run(sql);
        return { id, ...data };
    }

    async delete(id: any): Promise<any> {
        const sql = `DELETE FROM Users WHERE id = ${id}`;
        await run(sql);
        return { message: "Користувача видалено", id };
    }
}

export default new UserRepository();