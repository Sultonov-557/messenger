import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';

export class CreateMessageDto {
  @ApiProperty()
  @IsNotEmpty()
  text: string;

  @IsId()
  group_id: number;
}
