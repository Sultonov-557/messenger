import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Message } from 'src/modules/message/entities/message.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Group extends AbstractEntity {
  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.groups)
  @JoinTable()
  users: User[];

  @OneToMany(() => Message, (message) => message.group)
  @JoinTable()
  messages: Message[];
}
