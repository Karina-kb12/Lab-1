import express from 'express';
import userController from '../controllers/user.controller';

const router = express.Router();

router.get('/', (req, res) => userController.getAll(req, res));
router.get('/:id', (req, res) => userController.getOne(req, res));
router.post('/', (req, res) => userController.create(req, res));
router.put('/:id', (req, res) => userController.update(req, res));
router.delete('/:id', (req, res) => userController.remove(req, res));

export default router;