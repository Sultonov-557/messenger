import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class GetUserQueryDto extends PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  username?: string;
}
