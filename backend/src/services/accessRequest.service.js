const repository = require('../repositories/accessRequest.repository');

class AccessRequestService {
    async getAllRequests(query) {
        return await repository.findAll(query);
    }

    async createRequest(data) {
        console.log("DEBUG: Сервіс отримав дані:", data);

        const userId = parseInt(data.user_id) || 1;

        const newRequest = {
            user_id: userId,
            user_name: data.user_name,
            date: data.date || new Date().toISOString(),
            access_type: data.access_type || data.accessType || "Temporary", 
            comments: data.comments || "",
            status: data.status || "Pending"
        };

        console.log("DEBUG: Відправка в репозиторій:", newRequest);
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