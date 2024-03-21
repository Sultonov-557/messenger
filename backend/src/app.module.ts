import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mainDbConfig } from './common/database/config.database';
import { UserModule } from './modules/User/User.module';
import { MessageModule } from './modules/message/message.module';
import { GroupModule } from './modules/group/group.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(mainDbConfig),
    UserModule,
    GroupModule,
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
