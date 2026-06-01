import { all, get, run } from '../db/dbClient';

class AccessRequestRepository {
    async findAll(query?: any): Promise<any> {
        return await all("SELECT * FROM AccessRequests WHERE status != 'Rejected' ORDER BY id DESC LIMIT 10");
    }

    async findById(id: number, currentUserId?: number): Promise<any> {
    if (currentUserId !== undefined) {
        const sql = `SELECT * FROM AccessRequests WHERE id = ? AND user_id = ?`;
        return await get(sql, [id, currentUserId]);
        }
    
        return await get(`SELECT * FROM AccessRequests WHERE id = ?`, [id]);
    }

    async create(data: any): Promise<any> {
        const sql = `INSERT INTO AccessRequests (user_id, user_name, date, access_type, comments, status) 
                     VALUES (?, ?, ?, ?, ?, ?)`;
        const params = [data.user_id, data.user_name, data.date, data.access_type, data.comments || '', data.status || 'Pending'];
        const result = await run(sql, params);
        data.id = result.lastID;
        return data;
    }

    async update(id: any, data: any): Promise<any> {
        const sql = "UPDATE AccessRequests SET status = ?, comments = ? WHERE id = ?";
        const params = [data.status, data.comments, id];
        const result = await run(sql, params);
        return result.changes > 0 ? this.findById(id, data.userId || 0) : null;
    }

    async delete(id: any): Promise<any> {
        const result = await run("DELETE FROM AccessRequests WHERE id = ?", [id]);
        return result.changes > 0;
    }
}

export default new AccessRequestRepository();