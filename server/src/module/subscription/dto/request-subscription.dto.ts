import { IsInt, ValidateIf } from 'class-validator';

export class RequestSubscriptionDto {
  userId: number;

  @IsInt()
  @ValidateIf((object, value) => value !== null)
  planId!: number | null;
}
