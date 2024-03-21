import { AbstractEntity } from 'src/common/database/abstract.entity';
import { User } from 'src/modules/User/entities/user.entity';
import { Column, JoinColumn, ManyToOne } from 'typeorm';

export class Update extends AbstractEntity {
  @Column()
  data: string;

  @Column()
  name: string;

  @ManyToOne(() => User)
  @JoinColumn()
  to: User;
}
