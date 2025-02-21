import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mainDbConfig } from './common/database/config.database';
import { RedisModule } from './common/redis/redis.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(mainDbConfig), RedisModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
