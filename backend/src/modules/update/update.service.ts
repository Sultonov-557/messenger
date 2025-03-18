import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Update } from './entities/update.entity';
import { Repository } from 'typeorm';
import { Server, Socket } from 'socket.io';
import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { User } from '../user/entities/user.entity';
import { HttpError } from 'src/common/exception/http.error';
import { verify } from 'jsonwebtoken';
import { env } from 'src/common/config';

@Injectable()
@WebSocketGateway({ cors: true })
export class UpdateService implements OnGatewayConnection {
  constructor(
    @InjectRepository(Update) private updateRepo: Repository<Update>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  @WebSocketServer()
  private server: Server;

  private sockets: { [id: string]: Socket } = {};

  async handleConnection(client: Socket) {
    try {
      let bearer_token = client.handshake.headers.authorization;

      if (!bearer_token) {
        client.disconnect();
        return;
      }
      bearer_token = bearer_token.split(' ')[1];

      const user: any = verify(bearer_token, env.ACCESS_TOKEN_SECRET);
      if (!user) {
        client.disconnect();
        return;
      }

      this.sockets[user.id] = client;

      const updates = await this.getUpdates(user.id);

      for (const update of updates) {
        client.emit(update.name, update.data);
        await this.deleteUpdate(update.id);
      }
    } catch (error) {
      console.error(`Socket connection error: ${error.message}`);
      client.disconnect();
    }
  }

  @SubscribeMessage('ping')
  async ping() {
    return 'pong';
  }

  async getUpdates(user_id: number) {
    return await this.updateRepo.find({ where: { to: { id: user_id } } });
  }

  async addUpdate(user_id: number, update: { name: string; data: Record<string, any> }) {
    const socket = this.sockets[user_id];

    if (socket) {
      try {
        await socket.emit(update.name, update.data);
        return true;
      } catch (error) {
        // Socket emit failed, fall back to database storage
        console.error(`Socket emit failed: ${error.message}`);
      }
    }

    // Store update in database if socket connection is not available or emit failed
    const user = await this.userRepo.findOneBy({ id: user_id });
    if (!user) HttpError({ code: 'USER_NOT_FOUND' });
    return await this.updateRepo.save(this.updateRepo.create({ name: update.name, data: update.data, to: user }));
  }

  async deleteUpdate(id: number) {
    const update = await this.updateRepo.findOneBy({ id });

    if (!update) HttpError({ code: 'UPDATE_NOT_FOUND' });

    await this.updateRepo.remove(update);
  }
}
