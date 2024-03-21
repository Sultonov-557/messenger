import { SnakeNamingStrategy } from './namingStrategy.database';
import { env } from '../config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const mainDbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  namingStrategy: new SnakeNamingStrategy(),
  autoLoadEntities: true,
  cache: true,
  synchronize: env.DB_SYNC,
  logger: 'advanced-console',
  logging: ['error'],
  maxQueryExecutionTime: 1000,
  timezone: '+00:00',
};
