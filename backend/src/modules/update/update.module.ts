import { Module } from '@nestjs/common';
import { UpdateService } from './update.service';
import { UpdateGateway } from './update.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Update } from './entities/update.entity';
import { User } from '../User/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Update, User])],
  providers: [UpdateGateway, UpdateService],
  exports: [UpdateService],
})
export class UpdateModule {}
