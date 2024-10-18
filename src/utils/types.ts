export interface createOTPResponse {
  success: boolean;
  retryDelay: number;
}

export interface User {
  _id: string;
  phone: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  city: string;
}

export interface authResponse {
  success: boolean;
  user: User;
  token: string;
}
