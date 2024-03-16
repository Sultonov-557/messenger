import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { DecoratorWrapperWS } from 'src/common/auth/decorator.auth';
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Role } from 'src/common/auth/roles/role.enum';

@WebSocketGateway()
export class MessageGateway {
  constructor(private messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('new_message')
  @DecoratorWrapperWS('newMessage', true, [Role.User])
  async newMessage(@MessageBody() body: CreateMessageDto, @Req() req: Request) {
    const message = await this.messageService.create(req.user.id, body);
    if (message.success) {
      this.server.emit('new_message', message.data);
    } else {
      return message;
    }
  }
}
