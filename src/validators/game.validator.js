import { body } from 'express-validator';


export const gameRules = [
    body('titulo').notEmpty().withMessage('O campo título é obrigatório.'),
    body('genero').notEmpty().withMessage('O campo gênero é obrigatório.'),
    body('anoLancamento').optional().isInt({ min: 1950 }).withMessage('O ano de lançamento deve ser um número a partir de 1950.')
];

