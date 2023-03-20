import { Controller, Get, Param, HttpStatus, Post, Body, UseGuards, Req, Query } from '@nestjs/common';
import { AuthGuard } from '@guards';
import { ApiResponse, Filter, Pagination } from '@models';
import { SaveTemplateDto } from './dto/save-template.dto';
import { Template } from './template.entity';
import { TemplatesService } from './templates.service';

@Controller('template')
export class TemplatesController {
  constructor(private templatesService: TemplatesService) {}

  @Post()
  @UseGuards(AuthGuard)
  async saveTemplate(@Body() data: SaveTemplateDto, @Req() req: any): Promise<ApiResponse<Template>> {
    try {
      const { userId } = req;

      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: ['Template added successfully'],
        result: await this.templatesService.save({ ...data, userId: userId }),
      };
    } catch (err) {
      return {
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [err.message],
      };
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async getTemplates(@Query() query: Filter, @Req() req: any): Promise<ApiResponse<Pagination<Template>>> {
    const { userId } = req;

    return {
      success: true,
      statusCode: HttpStatus.OK,
      result: await this.templatesService.get(userId, query),
    };
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
