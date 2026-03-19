const db = require('../db');

class AccessRequestRepository {
    findAll() {
        return db.accessRequests;
    }
    findById(id) {
        return db.accessRequests.find(r => r.id === id);
    }
    create(data) {
        db.accessRequests.push(data);
        return data;
    }
    update(id, data) {
        const index = db.accessRequests.findIndex(r => r.id === id);
        if (index === -1) return null;
        db.accessRequests[index] = { 
            ...db.accessRequests[index], 
            ...data
        };
        return db.accessRequests[index];
    }
    delete(id) {
        const index = db.accessRequests.findIndex(r => r.id === id);
        if (index === -1) return false;
        db.accessRequests.splice(index, 1);
        return true;
    }
}
module.exports = new AccessRequestRepository();