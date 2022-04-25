import { Router } from 'express';
import userRouter from './api/user/user.controller';
import walletRouter from './api/wallet/wallet.controller';

const routes = Router();

routes.use('/wallet', walletRouter);
routes.use('/user', userRouter);

export default routes;
