import { model, Schema } from 'mongoose';
import { ITransaction } from './transaction.interface';

// Schema
const TransactionSchema: Schema = new Schema({
  blockNumber: { type: Number },
  blockHash: { type: String },
  transactionIndex: { type: Number },
  removed: { type: Boolean },
  address: { type: String },
  data: { type: String },
  topics: { type: Array },
  transactionHash: { type: String },
  logIndex: { type: Number }
});

const TransactionEntity = model<ITransaction>('Transaction', TransactionSchema);

export default TransactionEntity;
