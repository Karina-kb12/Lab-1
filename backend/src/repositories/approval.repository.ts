import { all, run } from '../db/dbClient';

class ApprovalRepository {
    async findAll(): Promise<any> {
        return await all("SELECT * FROM Approvals");
    }

    async create(data: any): Promise<any> {
        const sql = `INSERT INTO Approvals (request_id, admin_id, decision_date) 
                     VALUES (${data.requestId}, ${data.adminId}, '${new Date().toISOString()}')`;
        const result = await run(sql);
        data.id = result.lastID;
        return data;
    }
}

export default new ApprovalRepository();