import express, { Router } from 'express';
import { User } from '../domain/user/models/user';
import { CreateUserCommand } from '../domain/user/commands/create-user.command';

const userRouter = Router();

userRouter.get('/', (request: express.Request, response: express.Response) => {
  return response.json('OK');
});

userRouter.post('/', async (request: express.Request, response: express.Response) => {
  const user: User = request.body;

  const command = new CreateUserCommand();

  await command.execute(user);
  return response.status(201);
});

export default userRouter;
