import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './schemas/blog.schema';
import { CreateCommentDto } from './dto/create-comments.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() blog: CreateBlogDto, @Request() req): Promise<Blog> {
    return this.blogsService.create(blog, req.user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async edit(
    @Param('id') id: string,
    @Body() blog: CreateBlogDto,
    @Request() req,
  ) {
    await this.blogsService.edit({ ...blog}, req.user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Blog> {
    return this.blogsService.delete(id);
  }

  @Get()
  async findAll(): Promise<Blog[]> {
    return this.blogsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Blog> {
    return this.blogsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('like/:id')
  like(@Param('id', new ParseIntPipe()) id: number): Promise<Blog> {
    return this.blogsService.likeBlog(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('unlike/:id')
  unLike(@Param('id', new ParseIntPipe()) id: number): Promise<Blog> {
    return this.blogsService.unlikeBlog(id);
  }

  @Post('comment/:id')
  comment(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() comment: CreateCommentDto,
  ): Promise<Blog> {
    return this.blogsService.commentBlog(id, comment);
  }
}
