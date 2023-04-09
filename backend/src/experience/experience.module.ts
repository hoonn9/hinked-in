import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceEntity } from './entity/experience.entity';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExperienceEntity])],
  controllers: [ExperienceController],
  providers: [ExperienceService],
})
export class ExperienceModule {}
