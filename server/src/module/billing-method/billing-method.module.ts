import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { BillingMethodController } from './billing-method.controller';
import { BillingMethod } from './billing-method.entity';
import { BillingMethodService } from './billing-method.service';

config();

@Module({
  imports: [TypeOrmModule.forFeature([BillingMethod])],
  controllers: [BillingMethodController],
  providers: [BillingMethodService],
})
export class BillingMethodModule {}
