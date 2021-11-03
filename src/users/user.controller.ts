import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post, Request,
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
  @UseGuards(JwtAuthGuard)
  followUser(@Param('username') username: string,  @Request() req): Promise<User[]> {
    return this.usersService.followUser([username], req.user);
  }

  @Get('unfollow/:id')
  @UseGuards(JwtAuthGuard)
  unFollowUser(@Param('username') username: string,  @Request() req): Promise<User[]> {
    return this.usersService.unFollowUser([username], req.user);
  }
}
