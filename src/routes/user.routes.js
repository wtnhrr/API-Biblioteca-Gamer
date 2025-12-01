import express from 'express';
import UserController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import validate from '../middlewares/validation.middleware.js';
import rbacMiddleware from '../middlewares/rbac.middleware.js';
import { userCreationRules } from '../validators/user.validator.js';

const router = express.Router();

// Publica
router.post('/', userCreationRules, validate, UserController.create);

router.use(authMiddleware);

// Protegida
router.get('/', authMiddleware, rbacMiddleware(['admin']), UserController.getAll);
router.get('/:id', UserController.getById);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

router.post('/comprar/:gameId', authMiddleware, UserController.comprarJogo);

export default router;