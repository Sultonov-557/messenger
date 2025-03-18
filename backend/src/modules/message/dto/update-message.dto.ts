import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateMessageDto {
  @ApiPropertyOptional()
  @IsOptional()
  text?: string;
}
