import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { User, UsersService } from './users.service';
import { Users } from './schemas/users.owner.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(@Body() user: CreateUserDto): Promise<Users> {
    return this.usersService.createUser(user);
  }

  @Get()
  async findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  findOne(@Param('username') username: string): Promise<User> {
    return this.usersService.findOneByUsername(username);
  }

  @Get('follow/:id')
  followUser(@Param('id', new ParseIntPipe()) id: number): Promise<User[]> {
    return this.usersService.followUser([id]);
  }

  @Get('unfollow/:id')
  unFollowUser(@Param('id', new ParseIntPipe()) id: number): Promise<User[]> {
    return this.usersService.unFollowUser([id]);
  }
}
