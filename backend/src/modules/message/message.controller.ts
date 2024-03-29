import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Role } from 'src/common/auth/roles/role.enum';
import { CoreApiResponse } from 'src/common/response/core.responce';
import { ApiTags } from '@nestjs/swagger';
import { GetMessageQueryDto } from './dto/get-message-query.dto';

@ApiTags('MESSAGE')
@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get()
  @DecoratorWrapper('new message')
  async GetMessages(@Query() dto: GetMessageQueryDto) {
    return CoreApiResponse.success(await this.messageService.getAll(dto));
  }

  @Post()
  @DecoratorWrapper('new message', true, [Role.User])
  async newMessage(@Body() dto: CreateMessageDto, @Req() req: Request) {
    return CoreApiResponse.success(await this.messageService.create(req.user.id, dto));
  }

  @Delete(':id')
  @DecoratorWrapper('delete message', true, [Role.User])
  async deleteMessage(@Param('id') message_id: string, @Req() req: Request) {
    return CoreApiResponse.success(await this.messageService.delete(req.user.id, +message_id));
  }
}
