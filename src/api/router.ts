import { Router } from 'express';
import userRouter from './user.router';
import walletRouter from './wallet.router';

const routes = Router();

routes.use('/wallet', walletRouter);
routes.use('/user', userRouter);

export default routes;