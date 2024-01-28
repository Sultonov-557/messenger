import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class Message extends AbstractEntity {
  @Column()
  text: string;

  @ManyToOne(() => User)
  @JoinColumn()
  sender: User;
}
