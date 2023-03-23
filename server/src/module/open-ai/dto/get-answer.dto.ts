import { IsString } from 'class-validator';

export class GetAnswerDto {
  @IsString()
  prompt: string;
}
