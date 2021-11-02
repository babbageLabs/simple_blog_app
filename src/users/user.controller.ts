import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

import { User, UsersService } from './users.service';
import { Users } from './users.owner.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { use } from 'passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post('register')
  async registerUser(@Body() user: CreateUserDto): Promise<Users> {
    return this.usersService.createUser(user);
  }

  @Get()
  async findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.usersService.findOne(id);
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
