import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTemplateDto {
  userId: number;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
