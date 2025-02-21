import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional()
  @IsOptional()
  old_password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  new_password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  confirm_password?: string;
}
