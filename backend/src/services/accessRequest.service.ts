import repository from '../repositories/accessRequest.repository';

class AccessRequestService {
    async getAllRequests(query?: any): Promise<any[]> {
        return await repository.findAll(query);
    }

    async createRequest(data: any): Promise<any> {
        console.log("DEBUG: Сервіс отримав дані:", data);

        const userId = parseInt(data.user_id, 10) || 1;

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