import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mainDbConfig } from './common/database/config.database';
import { UserModule } from './modules/User/User.module';

@Module({
  imports: [TypeOrmModule.forRoot(mainDbConfig), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
