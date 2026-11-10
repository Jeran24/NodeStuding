import express from 'express';
import userRouter from './router/userRouter.js';
import stockRouter from './router/stockRouter.js';

const app = express();
app.use(express.json());
app.use('/api', userRouter);
app.use('/api', stockRouter);

app.listen(3000, () => console.log('Server is running on localhost:3000'))