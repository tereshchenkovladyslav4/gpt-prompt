import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Configuration, OpenAIApi } = require('openai');

@Injectable()
export class OpenAiService {
  private openai;
  constructor() {
    this.openai = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      }),
    );
  }

  async getCompletion(prompt: string): Promise<string> {
    const completion = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
    });
    return completion.data.choices[0].text;
  }
}
