import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schemas/users.owner.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SALT_WORK_FACTOR } from './constants';
import { UserFollowers, UserFollowersDocument } from './schemas/users.followers.schema';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>,
    @InjectModel(UserFollowers.name)
    private readonly userFollowersModel: Model<UserFollowersDocument>,
  ) {
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const existing: User | undefined = await this.findOneByUsername(
      user.username,
    );

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
    return this.usersModel.findOne({ username }).lean().exec();
  }

  async findAll(): Promise<User[]> {
    return this.usersModel.find().lean().exec();
  }

  async followUser(users: string[], user: any): Promise<any> {
    const followers = await this.userFollowersModel.findOne({
      username: user.username,
    });

    if (!followers) {
      return new Promise((resolve) => {
        return resolve({
          followersAdded: true,
        });
      });
    }

    return new Promise((resolve) => {
      return resolve({
        followersAdded: true,
      });
    });
  }

  async unFollowUser(users: string[], user: any): Promise<any> {
    const followers = await this.userFollowersModel.findOne({
      username: user.username,
    });
    if (followers) {
      return new Promise((resolve) => {
        return resolve({
          followersRemoved: true,
        });
      });
    }

    return new Promise((resolve) => {
      return resolve({
        followersRemoved: false,
      });
    });
  }
}
