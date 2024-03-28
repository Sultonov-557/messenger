import { Injectable } from '@nestjs/common';
import { In, Like, Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { UpdateMessageDto } from './dto/update-message.dto';
import { HttpError } from 'src/common/exception/http.error';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetMessageQueryDto } from './dto/get-message-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Group } from '../group/entities/group.entity';
import { UpdateService } from '../update/update.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private readonly messageRepo: Repository<Message>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
    private updateService: UpdateService,
  ) {}

  async create(sender_id: number, dto: CreateMessageDto) {
    const { text, group_id } = dto;

    const sender = await this.userRepo.findOneBy({ id: sender_id });
    const group = await this.groupRepo.findOne({
      where: { id: group_id },
      relations: { group_users: { user: true } },
    });

    if (!sender) HttpError({ code: 'USER_NOT_FOUND' });
    if (!group) HttpError({ code: 'GROUP_NOT_FOUND' });

    const message = await this.messageRepo.create({ text, sender, group });
    const { id, created_at } = message;
    group.group_users.forEach(async (groupUser) => {
      await this.updateService.addUpdate(groupUser.user.id, {
        name: 'create_message',
        data: { id, text, sender_id, group_id, created_at },
      });
    });

    await this.messageRepo.save(message);
    return message;
  }

  async delete(user_id: number, message_id: number) {
    const message = await this.messageRepo.findOneBy({ id: message_id });
    if (!message) return { success: false, error: 'MESSAGE_NOT_FOUND' };
    if (message.sender.id != user_id) return { success: false, error: 'ACCESS_DENIED' };
    await this.messageRepo.delete({ id: message.id });

    message.group.group_users.forEach(async (groupUser) => {
      await this.updateService.addUpdate(groupUser.user.id, { name: 'delete_message', data: message });
    });
    return {};
  }

  async getAll(query: GetMessageQueryDto) {
    const { limit = 10, page = 1, group_id, text } = query;
    const [messages, total] = await this.messageRepo.findAndCount({
      where: { group: { id: group_id }, text: Like(`%${text || ''}%`) },
      skip: (page - 1) * limit,
      relations: { group: true, sender: true },
      take: limit,
    });

    const data = messages.map((message) => {
      return {
        id: message.id,
        group_id: message.group.id,
        text: message.text,
        sender: { id: message.sender.id, username: message.sender.username },
      };
    });

    return { total, page, limit, data };
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

    message.group.group_users.forEach(async (groupUser) => {
      await this.updateService.addUpdate(groupUser.user.id, { name: 'update_message', data: message });
    });

    return await this.messageRepo.save(message);
  }
}
