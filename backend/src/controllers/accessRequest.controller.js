const service = require('../services/accessRequest.service');

exports.getAll = async (req, res) => {
    try {
        const data = await service.getAllRequests(req.query);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: { message: err.message } });
    }
};

exports.getOne = async (req, res) => {
    try {
        const item = await service.getById(req.params.id);
        if (!item) {
            return res.status(404).json({ 
                error: { code: "NOT_FOUND", message: "Request not found" } 
            });
        }
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: { message: err.message } });
    }
};

exports.create = async (req, res) => {
    const { user_id, date, access_type } = req.body;
    if (!user_id || !date || !access_type) {
        return res.status(400).json({ 
            error: { code: "VALIDATION_ERROR", message: "Missing required fields" } 
        });
    }
    try {
        const created = await service.createRequest(req.body);
        res.status(201).json(created);
    } catch (err) {
        res.status(400).json({ error: { message: err.message } });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await service.updateRequest(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ error: { code: "NOT_FOUND", message: "Request not found" } });
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: { message: err.message } });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await service.deleteRequest(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: { code: "NOT_FOUND", message: "Request not found" } });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: { message: err.message } });
    }
};