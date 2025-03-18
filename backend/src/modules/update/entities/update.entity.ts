import { AbstractEntity } from 'src/common/database/abstract.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Update extends AbstractEntity {
  @Column({ type: 'json' })
  data: Record<string, any>;

  @Column()
  name: string;

  @ManyToOne(() => User)
  @JoinColumn()
  to: User;
}
