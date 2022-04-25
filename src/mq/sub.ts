import amqp from 'amqplib';
import { ethers } from 'ethers';
import { ITransaction } from '../db/transaction/transaction.interface';
import { TransactionRepository } from '../db/transaction/transaction.repository';
import { ITransactionRepository } from '../domain/transaction/repositories/transaction-repository.interface';

export class Sub {
    tRepo: ITransactionRepository;
    constructor (readonly queue: string) {
      this.queue = queue;
      this.tRepo = new TransactionRepository();
    }

    start = async () => {
      const conn = await amqp.connect('amqp://root:pass@0.0.0.0:5672');
      const channel = await conn.createChannel();
      return channel;
    }

    recieve = async (channel) => {
      const tRepo = this.tRepo;
      await channel.assertQueue(this.queue, {
        durable: true
      });

      await channel.consume(this.queue, function (msg) {
        const t: ITransaction = JSON.parse(msg.content);
        try {
          const value: string = ethers.utils.formatEther(t.data);
          if (parseFloat(value) > 10) {
          // console.log(value, t.transactionHash);
            tRepo.save(t);
          }
        } catch (e) {}
      }, {
        noAck: true
      });
    }
}
