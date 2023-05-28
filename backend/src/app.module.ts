import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MemberModule } from './member/member.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { validateConfig } from './common/config/config-validator';
import { ExperienceModule } from './experience/experience.module';
import { envFilePath } from './common/config/env-file-path';
import { IndustryModule } from './industry/industry.module';
import { SchoolModule } from './school/school.module';
import { EducationModule } from './education/education.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      validate: validateConfig,
    }),
    DatabaseModule,
    AuthModule,
    MemberModule,
    ExperienceModule,
    IndustryModule,
    SchoolModule,
    EducationModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
