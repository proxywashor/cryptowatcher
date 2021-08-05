import { Router } from 'express';

const walletRouter = Router();

walletRouter.get('/', (request, response) => {
  return response.json('OK');
});

walletRouter.post('/', (request, response) => {
  return response.json('OK');
});

export default walletRouter;
