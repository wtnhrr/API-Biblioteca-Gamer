import express from 'express';
import GameController from '../controllers/game.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import rbacMiddleware from '../middlewares/rbac.middleware.js';
import { gameRules } from '../validators/game.validator.js';
import validate from '../middlewares/validation.middleware.js';
const router = express.Router();

router.use(authMiddleware);

// Publica
router.get('/', GameController.getAll);
router.get('/:id', GameController.getById);

// Protegida
router.post('/', rbacMiddleware(['admin']), gameRules, validate, GameController.create);
router.put('/:id', rbacMiddleware(['admin']), gameRules, validate, GameController.update);
router.delete('/:id', rbacMiddleware(['admin']), GameController.delete);

export default router;