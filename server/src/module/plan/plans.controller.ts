import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { PlanPeriod } from '@enums';
import { ApiResponse } from '@models';
import { Plan } from './plan.entity';
import { PlansService } from './plans.service';

@Controller('plan')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @Get()
  async getPlans(@Query() query: { period: PlanPeriod }): Promise<ApiResponse<Plan[]>> {
    const { period } = query;
    return {
      success: true,
      statusCode: HttpStatus.OK,
      result: await this.plansService.get(period),
    };
  }
}
