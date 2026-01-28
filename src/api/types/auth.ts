export type LoginResponse = {
  access: string;
  refresh: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: 'distressed' | 'volunteer';
};
