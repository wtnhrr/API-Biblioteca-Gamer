import express from 'express';
import ViewController from '../controllers/view.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import rbacMiddleware from '../middlewares/rbac.middleware.js';
import injectUser from '../middlewares/injectUser.middleware.js';

const router = express.Router();

router.use(injectUser);

router.get('/dashboard', authMiddleware, rbacMiddleware(['admin']), ViewController.renderDashboard);
router.get('/login', ViewController.renderLogin);

router.get('/loja', ViewController.renderStore);
router.get('/loja/:id', ViewController.renderGameDetails);

router.get('/biblioteca', authMiddleware, rbacMiddleware(['user']), ViewController.renderLibrary);

router.get('/', (req, res) => res.redirect('/relatorio/loja'));

export default router;