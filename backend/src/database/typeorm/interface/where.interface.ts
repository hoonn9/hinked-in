import { ObjectLiteral } from 'typeorm';

export interface WhereParams {
  where: string;
  parameters: ObjectLiteral;
}
