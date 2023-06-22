import { PickType } from '@nestjs/swagger';
import { PostDto } from './post.dto';

export class CreateCompanyPostParamDto extends PickType(PostDto, ['id']) {}

export class CreateCompanyPostBodyDto extends PickType(PostDto, ['content']) {}
