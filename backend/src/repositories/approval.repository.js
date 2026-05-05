const { all, run } = require('../db/dbClient');

class ApprovalRepository {
    async findAll() {
        return await all("SELECT * FROM Approvals");
    }

    async create(data) {
        const sql = `INSERT INTO Approvals (request_id, admin_id, decision_date) 
                     VALUES (${data.requestId}, ${data.adminId}, '${new Date().toISOString()}')`;
        const result = await run(sql);
        data.id = result.lastID;
        return data;
    }
}

module.exports = new ApprovalRepository();