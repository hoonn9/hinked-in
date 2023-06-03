import { IsDate, IsOptional } from 'class-validator';
import { IsID } from '../../common/decorator/validate-decorator/is-id.decorator';
import { Type } from 'class-transformer';

export class PostCursor {
  @IsID()
  id: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  createDate?: Date;
}
