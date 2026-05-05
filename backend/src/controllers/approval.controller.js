const service = require('../services/approval.service');

exports.getAll = async (req, res) => {
    try {
        const data = await service.getAllApprovals();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: { message: err.message } });
    }
};

exports.create = async (req, res) => {
    const { requestId, adminId, decision } = req.body;
    if (!requestId || !adminId || !decision) {
        return res.status(400).json({
            error: { code: "VALIDATION_ERROR", message: "requestId, adminId and decision are required" }
        });
    }
    try {
        const newApproval = await service.createApproval(req.body);
        res.status(201).json(newApproval);
    } catch (err) {
        res.status(404).json({
            error: { code: "NOT_FOUND", message: err.message }
        });
    }
};