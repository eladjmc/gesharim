import { Router } from 'express';
import * as municipalityController from '../controllers/municipality.controller';
import { validate } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { municipalitySchema } from '../types/dto';

const router = Router();

// Public (for contact form dropdown)
router.get('/', municipalityController.getAll);

// Admin (protected)
router.post('/', authMiddleware, validate(municipalitySchema), municipalityController.create);
router.put('/:id', authMiddleware, validate(municipalitySchema), municipalityController.update);
router.delete('/:id', authMiddleware, municipalityController.remove);

export default router;
