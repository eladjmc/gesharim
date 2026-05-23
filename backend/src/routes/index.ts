import { Router } from 'express';
import authRoutes from './auth.routes';
import projectRoutes from './project.routes';
import manhadRoutes from './manhad.routes';
import municipalityRoutes from './municipality.routes';
import emailTemplateRoutes from './emailTemplate.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/admin/manhadim', manhadRoutes);
router.use('/municipalities', municipalityRoutes);
router.use('/admin/email-templates', emailTemplateRoutes);

export default router;
