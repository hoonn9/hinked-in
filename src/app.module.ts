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
import { EmploymentTypeModule } from './employment-type/employment-type.module';
import { CompanyModule } from './company/company.module';
import { PostModule } from './post/post.module';
import { CustomLoggerModule } from './logger/custom-logger.module';

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
    EmploymentTypeModule,
    ExperienceModule,
    IndustryModule,
    SchoolModule,
    EducationModule,
    CompanyModule,
    PostModule,
    CustomLoggerModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
