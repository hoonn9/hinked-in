import { Type } from '@nestjs/common';
import { ApiPropertyOptions } from '@nestjs/swagger';

export type LazyTypeFunc = () => Type;

export type ApiPropertyOptionsWithFieldName = ApiPropertyOptions & {
  fieldName: string;
};
