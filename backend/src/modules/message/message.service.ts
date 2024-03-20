import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { UpdateMessageDto } from './dto/update-message.dto';
import { HttpError } from 'src/common/exception/http.error';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetMessageQueryDto } from './dto/get-message-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Group } from '../group/entities/group.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private readonly messageRepo: Repository<Message>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
  ) {}

  async create(sender_id: number, dto: CreateMessageDto) {
    const { text, group_id } = dto;

    const sender = await this.userRepo.findOneBy({ id: sender_id });
    const group = await this.groupRepo.findOneBy({ id: group_id, users: { id: sender_id } });

    if (!sender) return { success: false, error: 'USER_NOT_FOUND' };
    if (!group) return { success: false, error: 'GROUP_NOT_FOUND' };

    const message = await this.messageRepo.create({ text, sender, group });

    await this.messageRepo.save(message);
    const { created_at, id, updated_at } = message;

    return { success: true, data: { created_at, id, updated_at, sender_id, group_id } };
  }

  async delete(userID: number, messageID: number) {
    const message = await this.messageRepo.findOneBy({ id: messageID });
    if (!message) return { success: false, error: 'MESSAGE_NOT_FOUND' };
    if (message.sender.id != userID) return { success: false, error: 'ACCESS_DENIED' };
    await this.messageRepo.delete({ id: message.id });
    return { success: true, data: { id: message.id } };
  }

  async getAll(query: GetMessageQueryDto) {
    const { limit = 10, page = 1 } = query;
    const [result, total] = await this.messageRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: 'DESC' },
    });

    return { total, page, limit, data: result };
  }

  async getOne(id: number) {
    const message = await this.messageRepo.findOne({ where: { id } });
    if (!message) HttpError({ code: 'MESSAGE_NOT_FOUND' });
    return message;
  }

  async update(id: number, dto: UpdateMessageDto) {
    const message = await this.messageRepo.findOneBy({ id });
    if (!message) return HttpError({ code: 'MESSAGE_NOT_FOUND' });

    for (const key in message) {
      if (Object.prototype.hasOwnProperty.call(dto, key)) message[key] = dto[key];
    }

    return await this.messageRepo.save(message);
  }
}
