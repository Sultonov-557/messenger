import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Update } from './entities/update.entity';
import { Repository } from 'typeorm';
import { RemoteSocket, Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { User } from '../User/entities/user.entity';
import { HttpError } from 'src/common/exception/http.error';

@Injectable()
export class UpdateService {
  constructor(
    @InjectRepository(Update) private updateRepo: Repository<Update>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  @WebSocketServer()
  private server: Server;

  async getUpdates(user_id: number) {
    const updates = await this.updateRepo.find({ where: { to: { id: user_id } } });

    return updates;
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

    return await this.updateRepo.save(
      this.updateRepo.create({ name: update.name, data: JSON.stringify(update.data), to: user }),
    );
  }

  async deleteUpdate(id: number) {
    const update = await this.updateRepo.findOneBy({ id });

    if (!update) HttpError({ code: 'UPDATE_NOT_FOUND' });

    await this.updateRepo.delete(update);
  }
}
