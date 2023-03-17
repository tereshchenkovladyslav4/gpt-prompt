import { Controller, Get, Param, HttpStatus, Post, Body } from '@nestjs/common';
import { CreateTemplateDto } from './dto/createTemplate.dto';
import { TemplatesService } from './templates.service';

@Controller('template')
export class TemplatesController {
  constructor(private templatesService: TemplatesService) {}

  @Post()
  async createTemplate(@Body() data: CreateTemplateDto) {
    try {
      return {
        statusCode: HttpStatus.OK,
        message: ['Template added successfully'],
        data: await this.templatesService.create(data),
      };
    } catch (err) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  @Get(':id')
  async readTemplate(@Param('id') id: number) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.templatesService.read(id),
    };
  }
}
