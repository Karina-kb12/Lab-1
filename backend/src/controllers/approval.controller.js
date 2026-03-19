const service = require('../services/approval.service');
exports.getAll = (req, res) => {
    res.status(200).json(service.getAllApprovals());
};
exports.create = (req, res) => {
    const { requestId, adminId, decision } = req.body;
    // валідація
    if (!requestId || !adminId || !decision) {
        return res.status(400).json({
            error: { code: "VALIDATION_ERROR", message: "requestId, adminId and decision are required" }
        });
    }
    try {
        const newApproval = service.createApproval(req.body);
        res.status(201).json(newApproval);
    } catch (err) {
        res.status(404).json({
            error: { code: "NOT_FOUND", message: err.message }
        });
    }
};