import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Group } from './group.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class GroupUser extends AbstractEntity {
  @ManyToOne(() => Group, { nullable: false })
  @JoinColumn()
  group: Group;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  user: User;

  @Column({ default: false })
  banned: boolean;
}
