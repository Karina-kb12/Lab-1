const { all, get, run } = require('../db/dbClient');

class AccessRequestRepository {
    async findAll() {
        return await all("SELECT * FROM AccessRequests WHERE status != 'Rejected' ORDER BY date DESC LIMIT 10");
    }

    async findById(id) {
        return await get(`SELECT * FROM AccessRequests WHERE id = ${id}`);
    }

    async create(data) {
        const sql = `INSERT INTO AccessRequests (user_id, date, access_type, comments, status) 
                     VALUES (${data.user_id}, '${data.date}', '${data.access_type}', '${data.comments || ''}', 'Pending')`;
        const result = await run(sql);
        data.id = result.lastID;
        return data;
    }

    async update(id, data) {
        const sql = `UPDATE AccessRequests SET status = '${data.status}', comments = '${data.comments}' WHERE id = ${id}`;
        const result = await run(sql);
        return result.changes > 0 ? this.findById(id) : null;
    }

    async delete(id) {
        const result = await run(`DELETE FROM AccessRequests WHERE id = ${id}`);
        return result.changes > 0;
    }
}

module.exports = new AccessRequestRepository();