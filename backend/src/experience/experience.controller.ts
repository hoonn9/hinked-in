import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../common/exception/exception-filter/http-exception-filter';
import { Auth } from '../auth/decorator/auth.decorator';
import { CreateExperienceBodyDto } from './dto/create-experience-body.dto';

@UseFilters(HttpExceptionFilter)
@Controller('experience')
export class ExperienceController {
  @Auth()
  @Post()
  async create(@Body() body: CreateExperienceBodyDto) {
    return body;
  }
}
