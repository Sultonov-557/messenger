import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ default: 'user' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ default: 'user' })
  @IsNotEmpty()
  password: string;
}
