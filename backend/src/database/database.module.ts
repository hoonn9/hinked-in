import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormOptionFactory } from './typeorm/typeorm-option.factory';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeormOptionFactory,
    }),
  ],
})
export class DatabaseModule {}
