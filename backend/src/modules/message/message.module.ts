import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessageGateway } from './message.gateway';
import { User } from '../user/entities/user.entity';
import { Group } from '../group/entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message, Group])],
  controllers: [],
  providers: [MessageService, MessageGateway],
})
export class MessageModule {}
