import { Router } from 'express';
import * as projectController from '../controllers/project.controller';
import { validate } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { createProjectSchema, changeStatusSchema, addNoteSchema } from '../types/dto';

const router = Router();

// Public
router.post('/', validate(createProjectSchema), projectController.submitProject);

// Admin (protected)
router.get('/', authMiddleware, projectController.getProjects);
router.get('/stats', authMiddleware, projectController.getStats);
router.get('/:id', authMiddleware, projectController.getProjectById);
router.patch('/:id/status', authMiddleware, validate(changeStatusSchema), projectController.changeStatus);
router.post('/:id/notes', authMiddleware, validate(addNoteSchema), projectController.addNote);
router.delete('/:id/notes/:noteId', authMiddleware, projectController.deleteNote);
router.patch('/:id/notes/:noteId', authMiddleware, validate(addNoteSchema), projectController.editNote);

export default router;
