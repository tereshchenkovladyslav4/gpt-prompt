import { Type } from 'class-transformer';
import { IsDefined, IsNotEmptyObject, IsObject, IsString, ValidateNested } from 'class-validator';

export class Address {
  @IsString()
  address1: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsString()
  country_code: string;

  @IsString()
  firstName: string;

  @IsString()
  first_name: string;

  @IsString()
  lastName: string;

  @IsString()
  last_name: string;

  @IsString()
  province: string;

  @IsString()
  province_code: string;

  @IsString()
  selectedCountry: string;

  @IsString()
  state: string;

  @IsString()
  zip: string;
}

export class BillingMethodDto {
  userId: number;

  @IsString()
  paymentMethodToken: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Address)
  address: Address;
}
