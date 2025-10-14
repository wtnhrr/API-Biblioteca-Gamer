import express from 'express';
import 'dotenv/config';

import gameRoutes from './src/routes/game.routes.js';
import userRoutes from './src/routes/user.routes.js';
import authRoutes from './src/routes/auth.routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/games', gameRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});