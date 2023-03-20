import { Controller, Get, Param, HttpStatus, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@guards';
import { ApiResponse } from '@models';
import { CreateTemplateDto } from './dto/createTemplate.dto';
import { Template } from './template.entity';
import { TemplatesService } from './templates.service';

@Controller('template')
export class TemplatesController {
  constructor(private templatesService: TemplatesService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createTemplate(@Body() data: CreateTemplateDto, @Req() req: any): Promise<ApiResponse<Template>> {
    try {
      const { userId } = req;

      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: ['Template added successfully'],
        result: await this.templatesService.create({ ...data, userId: userId }),
      };
    } catch (err) {
      return {
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [err.message],
      };
    }
  }

  @Get(':id')
  async readTemplate(@Param('id') id: number): Promise<ApiResponse<Template>> {
    return {
      success: true,
      statusCode: HttpStatus.OK,
      result: await this.templatesService.read(id),
    };
  }
}
