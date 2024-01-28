import { Controller, Post, Body, Get, Param, ParseIntPipe, Req, Query, Delete, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Role } from 'src/common/auth/roles/role.enum';
import { CoreApiResponse } from 'src/common/response/core.responce';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetMessageQueryDto } from './dto/get-message-query.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { MessageService } from './message.service';

@ApiTags('MESSAGE')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post()
  @DecoratorWrapper('create message', true)
  async create(@Req() req: Request, @Body() dto: CreateMessageDto) {
    dto.fromID = req.user.id;
    return CoreApiResponse.success(await this.messageService.create(dto));
  }

  @Get()
  @DecoratorWrapper('userlarni olish')
  async getAll(@Query() dto: GetMessageQueryDto) {
    return CoreApiResponse.success(await this.messageService.getAll(dto));
  }

  @Get(':id')
  @DecoratorWrapper('Bitta userni olish')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return CoreApiResponse.success(await this.messageService.getOne(id));
  }

  @Delete(':id')
  @DecoratorWrapper("userni o'chirish", true, [Role.Admin])
  async delete(@Param('id', ParseIntPipe) id: number) {
    return CoreApiResponse.success(await this.messageService.delete(id));
  }

  @Patch(':id')
  @DecoratorWrapper('userni tahrirlash', true, [Role.Admin])
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMessageDto) {
    return CoreApiResponse.success(await this.messageService.update(id, dto));
  }
}
