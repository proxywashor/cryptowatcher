import amqp from 'amqplib';
import { ITransaction } from '../db/transaction/transaction.interface';

export class Pub {
  constructor (readonly queue: string) {
    this.queue = queue;
  }

    start = async () => {
      const conn = await amqp.connect('amqp://root:pass@0.0.0.0:5672');

      const channel = await conn.createChannel();
      return channel;
    }

    send = async (channel, transaction: ITransaction) => {
      await channel.assertQueue(this.queue, {
        durable: true
      });
      await channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(transaction)));
    }
}
