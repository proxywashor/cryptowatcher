import express from 'express';
import routes from './application/router';
import { ServerError } from './application/errors/server-error';
import * as dotenv from 'dotenv';
import connect from './db/connect';
import { ethers } from 'ethers';

dotenv.config();
const app = express();
const port = process.env.PORT;

const db = 'mongodb://localhost/cryptowatcher';
const pk: string = process.env.PK || '';

const wss: string = process.env.WSS || '';

const provider = new ethers.providers.WebSocketProvider(wss);
const wallet = new ethers.Wallet(pk);

const account: ethers.Wallet = wallet.connect(provider);

app.set('provider', provider);

global.account = account;

connect({ db });

app.use(express.json());
app.use(routes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof ServerError) {
    return res.status(err.status).json(err.message);
  }
  next(err);
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
