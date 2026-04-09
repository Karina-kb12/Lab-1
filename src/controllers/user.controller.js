const service = require('../services/user.service'); 
const { UserResponseDto } = require('../dtos/user.dto');

exports.getAll = async (req, res) => {
    try {
        const { limit, sort, order } = req.query;
        
        const users = await service.getAllUsers(limit, sort, order);
        const response = users.map(user => new UserResponseDto(user));
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: { message: err.message } });
    }
};

exports.getOne = async (req, res) => {
    try {
        const user = await service.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({
                error: { code: "NOT_FOUND", message: "Користувача не знайдено" }
            });
        }
        res.status(200).json(new UserResponseDto(user));
    } catch (err) {
        res.status(500).json({ error: { message: err.message } });
    }
};

exports.create = async (req, res) => {
    const { userName } = req.body;
    if (!userName) {
        return res.status(400).json({
            error: { code: "VALIDATION_ERROR", message: "Поле userName є обов'язковим" }
        });
    }
    try {
        const newUser = await service.createUser(req.body);
        res.status(201).json(new UserResponseDto(newUser));
    } catch (err) {
        res.status(400).json({ error: { message: err.message } });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedUser = await service.updateUser(req.params.id, req.body);
        res.status(200).json(new UserResponseDto(updatedUser));
    } catch (err) {
        res.status(400).json({ error: { message: err.message } });
    }
};

exports.remove = async (req, res) => {
    try {
        const result = await service.deleteUser(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: { message: err.message } });
    }
};