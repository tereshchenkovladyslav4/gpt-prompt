import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { config } from 'dotenv';
import { UsersModule } from './users/users.module';
import { TemplatesModule } from './templates/templates.module';

config();

const MODULES = [UsersModule, TemplatesModule];

@Module({
  imports: [DatabaseModule, ...MODULES],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
