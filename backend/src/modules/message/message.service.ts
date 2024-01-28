import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { UpdateMessageDto } from './dto/update-message.dto';
import { HttpError } from 'src/common/exception/http.error';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetMessageQueryDto } from './dto/get-message-query.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessageService {
  constructor(@InjectRepository(Message) private readonly messageRepo: Repository<Message>) {}

  async create(dto: CreateMessageDto) {
    const message = this.messageRepo.create(dto);
    return await this.messageRepo.save(message);
  }

  async delete(id: number) {
    const message = await this.messageRepo.findOneBy({ id });
    if (!message) HttpError({ code: 'MESSAGE_NOT_FOUND' });
    return (await this.messageRepo.delete({ id: message.id })).raw;
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
