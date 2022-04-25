import { ITransaction } from './transaction.interface';
import TransactionEntity from './transaction';
import { ITransactionRepository } from '../../domain/transaction/repositories/transaction-repository.interface';

export class TransactionRepository implements ITransactionRepository {
  async save (transaction: ITransaction): Promise<void> {
    const transactionFound = new TransactionEntity(transaction);
    await transactionFound.save();
  }

  // @todo: create mapper
  async random (): Promise<any> {
    const total = await TransactionEntity.countDocuments();
    const rand = Math.floor(Math.random() * total);
    return await TransactionEntity.findOne().skip(rand);
  }
}
