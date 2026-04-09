const repository = require('../repositories/accessRequest.repository');

class AccessRequestService {
    async getAllRequests(query) {
        return await repository.findAll(query);
    }

    async createRequest(data) {
        const newRequest = {
            user_id: data.user_id,
            date: data.date,
            access_type: data.access_type || data.accessType, 
            comments: data.comments || "",
            status: "Pending"
        };
        return await repository.create(newRequest);
    }

    async getById(id) {
        return await repository.findById(id);
    }

    async updateRequest(id, data) {
        return await repository.update(id, data);
    }

    async deleteRequest(id) {
        return await repository.delete(id);
    }
}

module.exports = new AccessRequestService();