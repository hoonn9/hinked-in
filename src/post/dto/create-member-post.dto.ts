import { PickType } from '@nestjs/swagger';
import { PostDto } from './post.dto';

export class CreateMemberPostBodyDto extends PickType(PostDto, ['content']) {}
