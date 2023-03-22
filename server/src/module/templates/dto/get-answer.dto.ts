import { IsString } from 'class-validator';

export class GetAnswerDto {
  @IsString()
  inputString: string;
}
