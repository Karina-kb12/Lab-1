const service = require('../services/accessRequest.service');

const sendError = (res, status, code, message, details = null) => {
    return res.status(status).json({
        status: status,
        title: code,
        message: message,
        details: details
    });
};

exports.getAll = async (req, res) => {
    try {
        const data = await service.getAllRequests(req.query);
        res.status(200).json(data);
    } catch (err) {
        sendError(res, 500, "INTERNAL_SERVER_ERROR", err.message);
    }
};

exports.getOne = async (req, res) => {
    try {
        const item = await service.getById(req.params.id);
        if (!item) {
            return sendError(res, 404, "NOT_FOUND", "Заявку не знайдено");
        }
        res.status(200).json(item);
    } catch (err) {
        sendError(res, 500, "INTERNAL_SERVER_ERROR", err.message);
    }
};

exports.create = async (req, res) => {
    console.log("--- Спроба створення заявки ---");
    console.log("Отримані дані (req.body):", req.body);

    const { user_id, user_name, access_type, date } = req.body;

    if (!user_id || !user_name || !access_type || !date) {
        console.warn("Помилка валідації: відсутні обов'язкові поля");
        return sendError(res, 400, "VALIDATION_ERROR", "Будь ласка, заповніть всі поля (ім'я, дата, тип доступу)", {
            received: { user_id, user_name, access_type, date },
            required: ["user_id", "user_name", "access_type", "date"]
        });
    }

    try {
        const created = await service.createRequest(req.body);
        console.log("Успішно створено для:", user_name, "ID:", created.id);
        res.status(201).json(created);
    } catch (err) {
        console.error("Помилка сервісу при створенні:", err.message);
        sendError(res, 400, "BAD_REQUEST", err.message);
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await service.updateRequest(req.params.id, req.body);
        if (!updated) {
            return sendError(res, 404, "NOT_FOUND", "Заявку для оновлення не знайдено");
        }
        res.status(200).json(updated);
    } catch (err) {
        sendError(res, 400, "BAD_REQUEST", err.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await service.deleteRequest(req.params.id);
        if (!deleted) {
            return sendError(res, 404, "NOT_FOUND", "Заявку для видалення не знайдено");
        }
        res.status(200).json({ message: "Заявку успішно видалено" });
    } catch (err) {
        sendError(res, 500, "INTERNAL_SERVER_ERROR", err.message);
    }
};