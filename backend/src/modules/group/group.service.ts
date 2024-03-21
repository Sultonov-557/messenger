import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Like, Not, Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { HttpError } from 'src/common/exception/http.error';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupUser } from './entities/group-user.entity';
import { FindGroupDto } from './dto/find-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Group) private groupRepo: Repository<Group>,
    @InjectRepository(GroupUser) private groupUserRepo: Repository<GroupUser>,
  ) {}

  async create(dto: CreateGroupDto) {
    const group = await this.groupRepo.create(dto);
    return await this.groupRepo.save(group);
  }

  async join(user_id: number, group_id: number) {
    const group = await this.groupRepo.findOneBy({ id: group_id, users: { id: Not(user_id) } });
    const user = await this.userRepo.findOneBy({ id: user_id });

    if (!group) HttpError({ code: 'GROUP_NOT_FOUND' });
    if (!user) HttpError({ code: 'USER_NOT_FOUND' });

    const groupUser = this.groupUserRepo.create({ group, user });
    await this.groupUserRepo.save(groupUser);

    return groupUser;
  }

  async leave(user_id: number, group_id: number) {
    const group = await this.groupRepo.findOneBy({ id: group_id, users: { id: user_id } });
    const user = await this.userRepo.findOneBy({ id: user_id });

    if (!group) HttpError({ code: 'GROUP_NOT_FOUND' });
    if (!user) HttpError({ code: 'USER_NOT_FOUND' });

    const groupUser = await this.groupUserRepo.findOneBy({ group, user });
    await this.groupRepo.delete(groupUser);

    return {};
  }

  async findAll(query: FindGroupDto, user_id: number) {
    const groups = await this.groupRepo.find({
      where: { name: Like(`%${query.name || ''}%`), users: { id: query.joined ? user_id : undefined } },
    });

    return groups;
  }
}
