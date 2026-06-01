import express from 'express';
import accessRequestController from '../controllers/accessRequest.controller';
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.use(authMiddleware);

router.get('/', accessRequestController.getAll.bind(accessRequestController));
router.post('/', accessRequestController.create.bind(accessRequestController));
router.put('/:id', accessRequestController.update.bind(accessRequestController));
router.delete('/:id', accessRequestController.remove.bind(accessRequestController));
router.get('/:id', accessRequestController.getOne.bind(accessRequestController));

export default router;