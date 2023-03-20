import { Controller, Get, Param, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiResponse } from '@models';
import { CreateTemplateDto } from './dto/createTemplate.dto';
import { Template } from './template.entity';
import { TemplatesService } from './templates.service';

@Controller('template')
export class TemplatesController {
  constructor(private templatesService: TemplatesService) {}

  @Post()
  async createTemplate(@Body() data: CreateTemplateDto): Promise<ApiResponse<Template>> {
    try {
      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: ['Template added successfully'],
        result: await this.templatesService.create(data),
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
