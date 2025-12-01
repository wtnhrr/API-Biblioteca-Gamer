import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/database.js';
import 'dotenv/config';

import gameRoutes from './src/routes/game.routes.js';
import userRoutes from './src/routes/user.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import viewRoutes from './src/routes/view.routes.js';
import reviewRoutes from './src/routes/review.routes.js';

import errorMiddleware from './src/middlewares/error.middleware.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', './src/views');

connectDB();

app.use('/games', gameRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/reviews', reviewRoutes);
app.use('/', viewRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});