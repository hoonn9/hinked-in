import { ApiTags } from '@nestjs/swagger';
import { UseController } from '../common/decorator/use-controller.decorator';

@ApiTags('school')
@UseController('school')
export class SchoolController {}
