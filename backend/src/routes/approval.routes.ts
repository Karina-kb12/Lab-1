import express from 'express';
import controller from '../controllers/approval.controller';

const router = express.Router();

router.get('/', (req, res) => controller.getAll(req, res));
router.post('/', (req, res) => controller.create(req, res));

export default router;