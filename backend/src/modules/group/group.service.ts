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

  async create(dto: CreateGroupDto, user_id: number) {
    const group = await this.groupRepo.create(dto);
    const user = await this.userRepo.findOneBy({ id: user_id });
    if (!user) HttpError({ code: 'USER_NOT_FOUND' });

    const groupUser = this.groupUserRepo.create({ group, user });
    await this.groupUserRepo.save(groupUser);

    return groupUser.group;
  }

  async join(user_id: number, group_id: number) {
    const joined = await this.groupUserRepo.existsBy({ group: { id: group_id }, user: { id: user_id } });
    if (joined) HttpError({ code: 'ALREADY_JOINED' });

    const group = await this.groupRepo.findOneBy({ id: group_id });
    const user = await this.userRepo.findOneBy({ id: user_id });

    if (!group) HttpError({ code: 'GROUP_NOT_FOUND' });
    if (!user) HttpError({ code: 'USER_NOT_FOUND' });

    const groupUser = this.groupUserRepo.create({ group, user });
    await this.groupUserRepo.save(groupUser);

    return groupUser;
  }

  async leave(user_id: number, group_id: number) {
    const joined = await this.groupUserRepo.existsBy({ group: { id: group_id }, user: { id: user_id } });
    if (joined) HttpError({ code: 'NOT_IN_GROUP' });

    const group = await this.groupRepo.findOneBy({ id: group_id });
    const user = await this.userRepo.findOneBy({ id: user_id });

    if (!group) HttpError({ code: 'GROUP_NOT_FOUND' });
    if (!user) HttpError({ code: 'USER_NOT_FOUND' });

    const groupUser = await this.groupUserRepo.findOneBy({ group, user });
    await this.groupRepo.delete(groupUser);

    return {};
  }

  async findAll(query: FindGroupDto, user_id: number) {
    const { joined, limit = 10, name, page = 1 } = query;

    const [data, total] = await this.groupRepo.findAndCount({
      where: {
        name: Like(`%${name || ''}%`),
        group_users: { user: { id: joined !== undefined ? (joined ? user_id : Not(user_id)) : undefined } },
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    return { data, total, limit, page };
  }

  async findOne(group_id: number, user_id: number) {
    const group: Group & { joined?: boolean } = await this.groupRepo.findOne({ where: { id: group_id } });
    if (!group) HttpError({ code: 'GROUP_NOT_FOUND' });
    if (await this.groupUserRepo.exists({ where: { group, user: { id: user_id } } })) {
      group.joined = true;
    } else {
      group.joined = false;
    }
    return group;
  }
}
