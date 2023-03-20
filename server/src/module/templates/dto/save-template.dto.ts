import { IsInt, IsString, ValidateIf } from 'class-validator';

export class SaveTemplateDto {
  userId: number;

  @IsInt()
  @ValidateIf((object, value) => value !== null)
  id!: number | null;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
