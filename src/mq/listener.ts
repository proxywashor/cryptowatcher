import * as dotenv from 'dotenv';
import { ethers } from 'ethers';
import { ITransaction } from '../db/transaction/transaction.interface';
import { Pub } from './pub';
import { Sub } from './sub';
import connect from '../db/connect';

dotenv.config();

const db = 'mongodb://localhost/cryptowatcher';
connect({ db });

const wss: string = process.env.WSS || '';

export class Listener {
    private provider: ethers.providers.WebSocketProvider;
    private topic;

    constructor () {
      this.provider = new ethers.providers.WebSocketProvider(wss);

      /*
      If you only want the events that denote "receive", then replace the topics as topics: [ transferEventTopic, null, myAddress ].

      If you only want the events that denote "send", then replace it is topics: [ transferEventTopic, myAddress ].
      */
      this.topic = ethers.utils.id('Transfer(address,address,uint256)'); // na to kanw pio general
    }

    start = async () => {
      const filter = {
        topics: [this.topic]
      };

      // Init PUB
      const pub = new Pub('test');
      const pubChannel = await pub.start();

      const sub = new Sub('test');
      const subChannel = await sub.start();
      sub.recieve(subChannel);

      this.provider.on(filter, (result: ITransaction) => {
        pub.send(pubChannel, result);
      });
    }
}

const listen = new Listener();
listen.start();
