import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class GetMessageQueryDto extends PaginationDto {
  @IsId(false)
  group_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  query?: string;
}
