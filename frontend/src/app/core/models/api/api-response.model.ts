export interface ApiResponse<T> {
  statusCode: number;
  message?: string[];
  success: boolean;
  result?: T;
}
