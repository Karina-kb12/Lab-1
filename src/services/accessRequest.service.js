const repo = require('../repositories/accessRequest.repository');
const { v4: uuidv4 } = require('uuid');

class AccessRequestService {
    getAllRequests(query) {
        let items = repo.findAll();
        if (query.status) {
            items = items.filter(i => i.status === query.status);
        }
        return items;
    }
    createRequest(data) {
        const newRequest = {
            id: uuidv4(),
            userName: data.userName,
            date: data.date,
            accessType: data.accessType,
            comments: data.comments || "",
            status: "Pending"
        };
        return repo.create(newRequest);
    }
    getById(id) {
        return repo.findById(id);
    }
    updateRequest(id, data) {
        return repo.update(id, data);
    }
    deleteRequest(id) {
        return repo.delete(id);
    }
}
module.exports = new AccessRequestService();