import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Message } from 'src/modules/message/entities/message.entity';
import { Column, Entity, JoinTable, OneToMany } from 'typeorm';
import { GroupUser } from './group-user.entity';

@Entity()
export class Group extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => GroupUser, (groupUser) => groupUser.group)
  group_users: GroupUser[];

  @OneToMany(() => Message, (message) => message.group)
  messages: Message[];
}
