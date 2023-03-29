import { IsInt, IsString } from 'class-validator';

export class GetAnswerDto {
  @IsInt()
  templateId: number;

  @IsString()
  placeholders: string;
}
