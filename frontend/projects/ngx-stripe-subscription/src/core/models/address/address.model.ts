export interface Address {
  id?: number;
  first_name: string;
  last_name: string;
  address1: string;
  address2?: string;
  phone?: string;
  city?: string;
  zip?: string;
  country: string;
  province?: string;
  company?: string;
  latitude?: number;
  longitude?: number;
  country_code: string;
  province_code?: string;
  email?: string;
}
