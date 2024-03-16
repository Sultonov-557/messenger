import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mainDbConfig } from './common/database/config.database';
import { UserModule } from './modules/User/User.module';
import { MessageModule } from './modules/message/message.module';

@Module({
  imports: [TypeOrmModule.forRoot(mainDbConfig), MessageModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
