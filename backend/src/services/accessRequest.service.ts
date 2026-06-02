import repository from '../repositories/accessRequest.repository';

class AccessRequestService {
    async getAllRequests(query?: any): Promise<any[]> {
        return await repository.findAll(query);
    }

    async createRequest(data: any): Promise<any> {
        const userId = parseInt(data.user_id || data.userId, 10) || 1;
        const userName = data.user_name || data.userName || "Karina";

        const newRequest = {
            user_id: userId,
            user_name: userName,
            date: data.date || new Date().toISOString(),
            access_type: data.access_type || data.accessType || "Temporary", 
            comments: data.comments || "",
            status: data.status || "Pending"
        };

        return await repository.create(newRequest);
    }

    async getById(id: number, currentUserId: number): Promise<any> {
        return await repository.findById(id, currentUserId);
    }

    async updateRequest(id: number, data: any): Promise<any> {
        return await repository.update(id, data);
    }

    async deleteRequest(id: number): Promise<any> {
        return await repository.delete(id);
    }
}

export default new AccessRequestService();