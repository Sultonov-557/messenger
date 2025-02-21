import { Column, Entity } from 'typeorm';
import { AbstractEntity } from 'src/common/database/abstract.entity';

@Entity('user')
export class User extends AbstractEntity {
  @Column('varchar', { unique: true })
  username: string;

  @Column('varchar')
  password: string;

  @Column({ nullable: true })
  refresh_token: string;
}
