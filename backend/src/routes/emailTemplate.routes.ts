import { Router } from 'express';
import * as emailTemplateController from '../controllers/emailTemplate.controller';
import { validate } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { updateEmailTemplateSchema } from '../types/dto';

const router = Router();

router.use(authMiddleware);

router.get('/', emailTemplateController.getAll);
router.get('/:id', emailTemplateController.getById);
router.put('/:id', validate(updateEmailTemplateSchema), emailTemplateController.update);

export default router;
