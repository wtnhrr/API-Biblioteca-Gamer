import express from 'express';
import ReviewController from '../controllers/review.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import rbacMiddleware from '../middlewares/rbac.middleware.js';

const router = express.Router();

// Aberto
router.get('/', ReviewController.getAll);
router.get('/game/:gameId', ReviewController.getByGame);

// Autenticado
router.post('/', authMiddleware, ReviewController.create);

// Role Admin
router.delete('/:id', authMiddleware, rbacMiddleware(['admin']), ReviewController.delete);

export default router;