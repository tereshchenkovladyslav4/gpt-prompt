import { Controller, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiResponse } from '@models';
import { GetAnswerDto } from './dto/get-answer.dto';
import { OpenAiService } from './open-ai.service';

@Controller('openai')
export class OpenAiController {
  constructor(private openAiService: OpenAiService) {}

  @Post('completion')
  async getCompletion(@Body() data: GetAnswerDto): Promise<ApiResponse<string>> {
    try {
      const { prompt } = data;
      return {
        success: true,
        statusCode: HttpStatus.OK,
        result: await this.openAiService.getCompletion(prompt),
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
