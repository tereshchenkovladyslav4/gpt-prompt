import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { OpenAiController } from './open-ai.controller';
import { OpenAiService } from './open-ai.service';
import { Template } from '../templates/template.entity';

config();

@Module({
  imports: [TypeOrmModule.forFeature([Template])],
  controllers: [OpenAiController],
  providers: [OpenAiService],
})
export class OpenAiModule {}
