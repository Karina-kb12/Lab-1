const db = require('../db');
class ApprovalRepository {
    findAll() {
        return db.approvals;
    }
    create(data) {
        db.approvals.push(data);
        return data;
    }
}
module.exports = new ApprovalRepository();