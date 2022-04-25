import app from '../../../app';
import { ethers } from 'ethers';
import { Router } from 'express';
import { ServerError } from '../../errors/server-error';
import { TransactionRepository } from '../../../db/transaction/transaction.repository';

const walletRouter = Router();
const account: ethers.Wallet = global.account;

walletRouter.get('/', async (request, response) => {
  const balance = await account.getBalance();

  // make a response dto
  return response.json({ address: account.address, balance: balance });
});

walletRouter.get('/random', async (request, response) => {
  try {
    const t = new TransactionRepository();
    const randomTransaction = await t.random();
    // make a response dto
    // return response.redirect(`https://bscscan.com/tx/${randomTransaction.transactionHash}`);
    return response.json(randomTransaction);
  } catch (e) {
    throw new ServerError();
  }
});

walletRouter.get('/transfers', (request, response) => {
  const topic = ethers.utils.id('Transfer(address,address,uint256)');

  const filter = {
    topics: [topic]
  };

  return response.json('OK');
});

walletRouter.get('/:address', async (request, response) => {
  try {
    const balance = await app.get('provider').getBalance(request.params.address);
    // make a response dto
    return response.json({ address: request.params.address, balance: ethers.utils.formatEther(balance) });
  } catch (e) {
    throw new ServerError();
  }
});

walletRouter.get('/:address/history', async (request, response) => {
  try {
  // const history = await app.get('provider').getHistory(request.params.address);
    app.get('provider').on('pending', (tx) => {
      fetch(tx);

      // Emitted when any new pending transaction is noticed
    });
    // make a response dto
    return response.json();
  } catch (e) {
    throw new ServerError();
  }
});

const fetch = async (tx) => {
  console.log(await app.get('provider').getTransaction(tx));
};
/**
 * provider.on("pending", (tx) => {
    // Emitted when any new pending transaction is noticed
});
 */

export default walletRouter;
