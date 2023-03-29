import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentType } from '@enums';
import { Repository } from 'typeorm';
import { GetAnswerDto } from './dto/get-answer.dto';
import { Template } from '../templates/template.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Configuration, OpenAIApi } = require('openai');

@Injectable()
export class OpenAiService {
  private openai;
  constructor(
    @InjectRepository(Template)
    private templatesRepository: Repository<Template>,
  ) {
    this.openai = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      }),
    );
  }

  private async getCompletion(prompt: string): Promise<string> {
    const completion = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
    });
    return completion.data.choices[0].text;
  }

  async getTemplateCompletion(data: GetAnswerDto): Promise<string> {
    const { templateId, placeholders } = data;
    const template = await this.templatesRepository.findOne({ where: { id: templateId } });
    const values = JSON.parse(placeholders);

    let contentStr = template?.content || '';
    const contents = [];
    let index = 0;
    while (1) {
      const matches = /([^{]*.)(\{\{([A-Za-z0-9 _-]*)\}\})/g.exec(contentStr);
      if (!matches) {
        if (!!contentStr) {
          contents.push({
            title: contentStr,
            type: ContentType.STRING,
          });
        }
        break;
      }
      contentStr = contentStr.replace(matches[0], '');
      if (matches[1]) {
        contents.push({
          title: matches[1],
          type: ContentType.STRING,
        });
        index++;
      }
      if (matches[3]) {
        contents.push({
          title: matches[3],
          type: ContentType.KEYWORD,
        });
      }
    }

    const prompt = contents
      .map((item, index) => {
        if (item.type == ContentType.STRING) {
          return item.title;
        } else {
          return values[index];
        }
      })
      .join('');

    return this.getCompletion(prompt);
  }
}
