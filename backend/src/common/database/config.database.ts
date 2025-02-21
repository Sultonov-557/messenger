import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SnakeNamingStrategy } from './namingStrategy.database';
import { env } from '../config';
import { User } from 'src/modules/user/entities/user.entity';

export const mainDbConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [User],
  synchronize: env.DB_SYNC,
  logger: 'advanced-console',
  logging: ['error'],
  maxQueryExecutionTime: 1000,
  timezone: '+00:00',
};
