import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Group } from 'src/modules/group/entities/group.entity';

@Entity()
export class Message extends AbstractEntity {
  @Column()
  text: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn()
  sender: User;

  @ManyToOne(() => Group, { onDelete: 'CASCADE' })
  @JoinColumn()
  group: Group;
}
