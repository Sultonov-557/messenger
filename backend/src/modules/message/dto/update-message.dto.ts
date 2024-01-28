import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';

export class UpdateMessageDto {
  @ApiPropertyOptional()
  @IsOptional()
  text?: string;
}
