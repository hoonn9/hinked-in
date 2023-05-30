import { TransactionManager } from '../common/type/transaction-manager.type';

export abstract class SeederService {
  abstract runFromJSONFile(
    manager: TransactionManager,
    filePath?: string,
  ): Promise<void>;
}
