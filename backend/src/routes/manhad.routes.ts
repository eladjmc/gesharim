import { Router } from 'express';
import * as manhadController from '../controllers/manhad.controller';
import { validate } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { createManhadSchema } from '../types/dto';

const router = Router();

router.use(authMiddleware);

router.get('/', manhadController.getAll);
router.get('/:id', manhadController.getById);
router.post('/', validate(createManhadSchema), manhadController.create);
router.put('/:id', validate(createManhadSchema), manhadController.update);
router.delete('/:id', manhadController.remove);

export default router;
