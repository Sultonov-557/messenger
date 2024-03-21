import { Controller, Post, Param, Req, Get } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { Request } from 'express';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { CoreApiResponse } from 'src/common/response/core.responce';
import { FindGroupDto } from './dto/find-group.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('/join/:id')
  @DecoratorWrapper('join group', true)
  async join(@Param('id') group_id: number, @Req() req: Request) {
    return CoreApiResponse.success(await this.groupService.join(req.user.id, group_id));
  }

  @Post('/leave/:id')
  @DecoratorWrapper('join group', true)
  async leave(@Param('id') group_id: number, @Req() req: Request) {
    return CoreApiResponse.success(await this.groupService.leave(req.user.id, group_id));
  }

  @Post()
  @DecoratorWrapper('create group', true)
  async create(dto: CreateGroupDto) {
    return CoreApiResponse.success(await this.groupService.create(dto));
  }

  @Get()
  @DecoratorWrapper('findAll group', true)
  async findAll(query: FindGroupDto, @Req() req: Request) {
    return CoreApiResponse.success(await this.groupService.findAll(query, req.user.id));
  }
}
