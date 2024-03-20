export class RegisterUserRequest {
  username: string;
  email: string;
  password: string;
}

export class LoginUserRequest {
  email: string;
  password: string;
}

export class UpdateUserRequest {
  email?: string;
  password?: string;
}

export class UserResponse {
  username: string;
  email: string;
  token?: string;
}