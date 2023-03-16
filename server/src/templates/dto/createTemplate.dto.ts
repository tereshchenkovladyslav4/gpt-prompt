import { IsNotEmpty } from 'class-validator';

export class CreateTemplateDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}
