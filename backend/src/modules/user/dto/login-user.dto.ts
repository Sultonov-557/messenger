import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ default: 'string' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ default: 'string' })
  @IsNotEmpty()
  password: string;
}
