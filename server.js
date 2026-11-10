import express from 'express';
import userRouter from './router/userRouter.js';
import stockRouter from './router/stockRouter.js';
import authRouter from './router/authRouter.js';

const app = express();
app.use(express.json());
app.use('/api', userRouter);
app.use('/api', stockRouter);
app.use('/api', authRouter);

app.listen(3000, () => console.log('Server is running on localhost:3000'))