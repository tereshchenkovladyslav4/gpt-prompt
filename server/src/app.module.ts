import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { TemplatesModule } from './module/templates/templates.module';
import { UsersModule } from './module/users/users.module';

config();

const MODULES = [UsersModule, TemplatesModule];

@Module({
  imports: [DatabaseModule, ...MODULES],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
