import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { User } from '../user/entities/user.entity';
import { Group } from '../group/entities/group.entity';
import { MessageController } from './message.controller';
import { UpdateModule } from '../update/update.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message, Group]), UpdateModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
