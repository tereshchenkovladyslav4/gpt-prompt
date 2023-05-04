import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@guards';
import { ApiResponse } from '@models';
import { BillingMethod } from './billing-method.entity';
import { BillingMethodService } from './billing-method.service';
import { BillingMethodDto } from './dto/billing-method.dto';

@Controller('billing-method')
export class BillingMethodController {
  constructor(private billingMethodService: BillingMethodService) {}
  @Get('token')
  async getCardSetupToken(): Promise<ApiResponse<string>> {
    return {
      success: true,
      statusCode: HttpStatus.OK,
      result: await this.billingMethodService.getCardSetupToken(),
    };
  }

  @Post()
  @UseGuards(AuthGuard)
  async saveTemplate(@Body() data: BillingMethodDto, @Req() req: any): Promise<ApiResponse<BillingMethod>> {
    try {
      const { userId } = req;

      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: ['Billing method added successfully'],
        result: await this.billingMethodService.save({ ...data, userId: userId }),
      };
    } catch (err) {
      return {
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [err.message],
      };
    }
  }
}
