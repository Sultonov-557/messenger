import { IsNotEmpty, IsString } from 'class-validator';

export class NewMessageBody {
  @IsString()
  @IsNotEmpty()
  text: string;
}
