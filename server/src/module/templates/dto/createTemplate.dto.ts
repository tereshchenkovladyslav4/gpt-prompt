import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
