const repo = require('../repositories/user.repository');
const { v4: uuidv4 } = require('uuid');
const { UserResponseDto } = require('../dtos/user.dto');

exports.getAll = (req, res) => {
    const users = repo.findAll();
    const response = users.map(user => new UserResponseDto(user));
    res.status(200).json(response);
};

exports.getOne = (req, res) => {
    const user = repo.findById(req.params.id);
    if (!user) {
        return res.status(404).json({
            error: { code: "NOT_FOUND", message: "Користувача не знайдено" }
        });
    }
    res.status(200).json(new UserResponseDto(user));
};

exports.create = (req, res) => {
    const { userName } = req.body;

    if (!userName) {
        return res.status(400).json({
            error: { code: "VALIDATION_ERROR", message: "Поле userName є обов'язковим" }
        });
    }

    const newUser = {
        id: uuidv4(),
        userName: userName
    };

    repo.create(newUser);

    res.status(201).json(new UserResponseDto(newUser));
};