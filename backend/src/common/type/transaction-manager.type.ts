import { EntityManager } from 'typeorm';
import { Request } from 'express';

export type TransactionManager = EntityManager;

export type TransactionRequest = Request & {
  transactionManager: TransactionManager;
};
