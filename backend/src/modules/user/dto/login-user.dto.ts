import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ default: 'admin' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ default: 'admin' })
  @IsNotEmpty()
  password: string;
}
