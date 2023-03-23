import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { OpenAiController } from './open-ai.controller';
import { OpenAiService } from './open-ai.service';

config();

@Module({
  imports: [],
  controllers: [OpenAiController],
  providers: [OpenAiService],
})
export class OpenAiModule {}
