import { body } from 'express-validator';

export const userCreationRules = [
    body('nome').notEmpty().withMessage('O campo nome é obrigatório.'),
    body('email').isEmail().withMessage('O email fornecido não é válido.'),
    body('senha').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres.'),
    body('role').isIn(['admin', 'user']).withMessage('O papel (role) deve ser "admin" ou "user".')
];