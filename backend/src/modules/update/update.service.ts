import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Update } from './entities/update.entity';
import { Repository } from 'typeorm';
import { Server, Socket } from 'socket.io';
import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { User } from '../User/entities/user.entity';
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

  async handleConnection(client: Socket) {
    let bearer_token = client.handshake.headers.authorization;

    if (!bearer_token) {
      client.disconnect();
    }
    bearer_token = bearer_token.split(' ')[1];

    const user: any = verify(bearer_token, env.ACCESS_TOKEN_SECRET);
    if (!user) client.disconnect();

    client.data.user_id = user.id;

    const updates = await this.getUpdates(user.id);

    for (let update of updates) {
      client.emit(update.name, update.data);
      await this.deleteUpdate(update.id);
    }
  }

  async getUpdates(user_id: number) {
    return await this.updateRepo.find({ where: { to: { id: user_id } } });
  }

  async addUpdate(user_id: number, update: { name: string; data: object }) {
    const sockets = await this.server.fetchSockets();

    for (let socket of sockets) {
      if (socket.data.user_id != user_id) continue;
      socket.emit(update.name, update.data);
      return;
    }
    const user = await this.userRepo.findOneBy({ id: user_id });

    if (!user) HttpError({ code: 'USER_NOT_FOUND' });

    return await this.updateRepo.save(this.updateRepo.create({ name: update.name, data: update.data, to: user }));
  }

  async deleteUpdate(id: number) {
    const update = await this.updateRepo.findOneBy({ id });

    if (!update) HttpError({ code: 'UPDATE_NOT_FOUND' });

    await this.updateRepo.delete(update);
  }
}
