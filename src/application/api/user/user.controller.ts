import express, { Router } from 'express';
import { User } from '../../../domain/user/models/user';
import { CreateUserCommand } from '../../../domain/user/commands/create-user.command';
import { ServerError } from '../../errors/server-error';

const userRouter = Router();

userRouter.get('/', (request: express.Request, response: express.Response) => {
  return response.json('OK');
});

userRouter.post('/', async (request: express.Request, response: express.Response) => {
  const user: User = request.body;

  const command = new CreateUserCommand();

  try {
    await command.execute(user);
  } catch (e) {
    throw new ServerError();
  }
  return response.status(201);
});

export default userRouter;
