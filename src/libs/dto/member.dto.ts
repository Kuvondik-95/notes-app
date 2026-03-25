export class SignupDto {
  nick: string;
  phone: string;
  password: string;
  email?: string;
  address?: string;
}

export class LoginDto {
  nick: string;
  password: string;
}
