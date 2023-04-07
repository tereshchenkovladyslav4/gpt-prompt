import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanPeriod } from '@enums';
import { In, Repository } from 'typeorm';
import { Plan } from './plan.entity';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private plansRepository: Repository<Plan>,
  ) {}

  async get(period: PlanPeriod): Promise<Plan[]> {
    const qb = await this.plansRepository
      .createQueryBuilder('Plan')
      .where({ active: true, period: In([period, PlanPeriod.ALL]) });
    return await qb.getMany();
  }
}
