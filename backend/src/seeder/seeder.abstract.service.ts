import { TransactionManager } from '../common/type/transaction-manager.type';

export abstract class SeederService {
  abstract run(manager: TransactionManager): Promise<void>;
}
