// контролер приймає req і повертає res з правильним кодом стану 200, 201, 404
const service = require('../services/accessRequest.service');
exports.getAll = (req, res) => {
    const data = service.getAllRequests(req.query);
    res.status(200).json(data);
};
exports.getOne = (req, res) => {
    const item = service.getById(req.params.id);
    if (!item) {
        return res.status(404).json({ 
            error: { code: "NOT_FOUND", message: "Request not found" } 
        });
    }
    res.status(200).json(item);
};
exports.create = (req, res) => {
    const { userName, date, accessType } = req.body;
    if (!userName || !date || !accessType) {
        return res.status(400).json({ 
            error: { code: "VALIDATION_ERROR", message: "Missing required fields" } 
        });
    }
    const created = service.createRequest(req.body);
    res.status(201).json(created);
};
exports.update = (req, res) => {
    const updated = service.updateRequest(req.params.id, req.body);
    if (!updated) {
        return res.status(404).json({ error: { code: "NOT_FOUND", message: "Request not found" } });
    }
    res.status(200).json(updated);
};

exports.delete = (req, res) => {
    const deleted = service.deleteRequest(req.params.id);
    if (!deleted) {
        return res.status(404).json({ error: { code: "NOT_FOUND", message: "Request not found" } });
    }
    res.status(204).send();
};