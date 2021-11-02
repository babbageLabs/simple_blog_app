import { IsEmail, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  password: string;
}

export class UserEntity {
  _id: string;
  username: string;
  email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
