import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SnakeNamingStrategy } from './namingStrategy.database';
import { env } from '../config';
import { User } from '../../modules/user/entities/user.entity';
import { Message } from '../../modules/message/entities/message.entity';
import { Group } from 'src/modules/group/entities/group.entity';
import { GroupUser } from 'src/modules/group/entities/group-user.entity';

export const mainDbConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [User, Message, Group, GroupUser],
  synchronize: env.DB_SYNC,
  logger: 'advanced-console',
  logging: ['error'],
  maxQueryExecutionTime: 1000,
  timezone: '+00:00',
};
