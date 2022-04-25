import { ITransaction } from '../../../db/transaction/transaction.interface';

export interface ITransactionRepository {
    save (transaction: ITransaction): Promise<void>
}
