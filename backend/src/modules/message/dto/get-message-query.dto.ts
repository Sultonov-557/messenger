import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class GetMessageQueryDto extends PaginationDto {
  @IsId(false)
  group_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  text?: string;
}
