import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './users.owner.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SALT_WORK_FACTOR } from './constants';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>,
  ) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const existing: User | undefined = await this.findOneByUsername(
      user.username,
    );
    console.log(222222222, existing);
    if (existing) {
      throw new HttpException('User already exists', 400);
    }
    user.password = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
    return this.usersModel.create(user);
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.usersModel.findById(id).exec();
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersModel.findOne({ username }).exec();
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  async followUser(users: number[]): Promise<User[]> {
    return [];
  }

  async unFollowUser(users: number[]): Promise<User[]> {
    return [];
  }
}
