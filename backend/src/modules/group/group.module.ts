import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { User } from '../user/entities/user.entity';
import { GroupUser } from './entities/group-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User, GroupUser])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
