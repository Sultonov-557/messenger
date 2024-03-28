import { Controller, Post, Param, Req, Get, Body, Query } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { Request } from 'express';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { CoreApiResponse } from 'src/common/response/core.responce';
import { FindGroupDto } from './dto/find-group.dto';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/auth/roles/role.enum';

@ApiTags('GROUP')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('/join/:id')
  @DecoratorWrapper('join group', true, [Role.User])
  async join(@Param('id') group_id: number, @Req() req: Request) {
    return CoreApiResponse.success(await this.groupService.join(req.user.id, group_id));
  }

  @Post('/leave/:id')
  @DecoratorWrapper('join group', true, [Role.User])
  async leave(@Param('id') group_id: number, @Req() req: Request) {
    return CoreApiResponse.success(await this.groupService.leave(req.user.id, group_id));
  }

  @Post()
  @DecoratorWrapper('create group', true, [Role.User])
  async create(@Body() dto: CreateGroupDto) {
    return CoreApiResponse.success(await this.groupService.create(dto));
  }

  @Get()
  @DecoratorWrapper('findAll group', true, [Role.User])
  async findAll(@Query() query: FindGroupDto, @Req() req: Request) {
    return CoreApiResponse.success(await this.groupService.findAll(query, req.user.id));
  }

  @Get(':id')
  @DecoratorWrapper('findOne group', true, [Role.User])
  async findOne(@Param('id') id: string, @Req() req: Request) {
    return CoreApiResponse.success(await this.groupService.findOne(+id, req.user.id));
  }
}
