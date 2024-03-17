import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Role } from 'src/common/auth/roles/role.enum';
import { Group } from 'src/modules/group/entities/group.entity';

@Entity()
export class User extends AbstractEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column({ nullable: true })
  refresh_token: string;

  @ManyToMany(() => Group, (group) => group.users)
  groups: Group[];
}
