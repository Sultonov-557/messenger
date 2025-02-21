import { Controller, Post, Body, Get, Param, ParseIntPipe, Req, Query, Delete, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Role } from 'src/common/auth/roles/role.enum';
import { CoreApiResponse } from 'src/common/response/core.responce';
import { RegisterUserDto } from './dto/register-user.dto';
import { GetUserQueryDto } from './dto/get-user-query.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshUserDto } from './dto/refresh-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { UserService } from './user.service';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @DecoratorWrapper('User login ')
  async login(@Body() dto: LoginUserDto) {
    return CoreApiResponse.success(await this.userService.login(dto));
  }

  @Post('refresh')
  @DecoratorWrapper('User refresh token')
  async refresh(@Body() dto: RefreshUserDto) {
    return CoreApiResponse.success(await this.userService.refresh(dto));
  }

  @Post('logout')
  @DecoratorWrapper('Logout', true, [Role.User])
  async logout(@Req() req: Request) {
    return CoreApiResponse.success(await this.userService.logout(req.user.id));
  }

  @Post('register')
  @DecoratorWrapper('Register User')
  async register(@Body() dto: RegisterUserDto) {
    return CoreApiResponse.success(await this.userService.register(dto));
  }

  @Get()
  @DecoratorWrapper('Get Users', true, [Role.User])
  async getAll(@Query() dto: GetUserQueryDto) {
    return CoreApiResponse.success(await this.userService.getAll(dto));
  }

  @Get(':id')
  @DecoratorWrapper('Get User', true, [Role.User])
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return CoreApiResponse.success(await this.userService.getOne(id));
  }

  @Delete(':id')
  @DecoratorWrapper('Delete User', true, [Role.User])
  async delete(@Param('id', ParseIntPipe) id: number) {
    return CoreApiResponse.success(await this.userService.delete(id));
  }

  @Patch(':id')
  @DecoratorWrapper('Update User', true, [Role.User])
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return CoreApiResponse.success(await this.userService.update(id, dto));
  }
}
