import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { BillingMethodModule } from './module/billing-method/billing-method.module';
import { OpenAiModule } from './module/open-ai/open-ai.module';
import { PlansModule } from './module/plan/plans.module';
import { SubscriptionsModule } from './module/subscription/subscriptions.module';
import { TemplatesModule } from './module/templates/templates.module';
import { UsersModule } from './module/users/users.module';

config();

const MODULES = [UsersModule, TemplatesModule, OpenAiModule, PlansModule, SubscriptionsModule, BillingMethodModule];

@Module({
  imports: [DatabaseModule, ...MODULES],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
