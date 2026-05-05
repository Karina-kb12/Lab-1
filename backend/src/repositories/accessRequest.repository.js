const { all, get, run } = require('../db/dbClient');

class AccessRequestRepository {
    async findAll() {
        return await all("SELECT * FROM AccessRequests WHERE status != 'Rejected' ORDER BY id DESC LIMIT 10");
    }

    async findById(id) {
        return await get("SELECT * FROM AccessRequests WHERE id = ?", [id]);
    }

    async create(data) {
        const sql = `INSERT INTO AccessRequests (user_id, user_name, date, access_type, comments, status) 
                     VALUES (?, ?, ?, ?, ?, ?)`;
        
        const params = [
            Number(data.user_id), 
            data.user_name,
            data.date, 
            data.access_type, 
            data.comments || '', 
            data.status || 'Pending'
        ];

        const result = await run(sql, params);
        return { id: result.lastID, ...data };
    }

    async update(id, data) {
        const sql = "UPDATE AccessRequests SET status = ?, comments = ? WHERE id = ?";
        const params = [data.status, data.comments, id];
        const result = await run(sql, params);
        return result.changes > 0 ? this.findById(id) : null;
    }

    async delete(id) {
        const result = await run("DELETE FROM AccessRequests WHERE id = ?", [id]);
        return result.changes > 0;
    }
}

module.exports = new AccessRequestRepository();