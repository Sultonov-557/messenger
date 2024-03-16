import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { NewMessageBody } from './body/newMessage.body';
import { Server } from 'socket.io';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../user/entities/user.entity';
import { HttpError } from 'src/common/exception/http.error';

@WebSocketGateway(5000)
export class MessageGateway {
  constructor(
    @InjectRepository(Message) private messageRepo: Repository<Message>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('new_message')
  @DecoratorWrapper('newMessage', true)
  async newMessage(@MessageBody() body: NewMessageBody, @Req() req: Request) {
    const { text } = body;
    const sender = await this.userRepo.findOneBy({ id: req.user.id });
    if (!sender) HttpError({ code: 'USER_NOT_FOUND' });

    const message = await this.messageRepo.create({ text, sender });

    this.messageRepo.save(message);
    this.server.emit('new_message', message);
  }
}
