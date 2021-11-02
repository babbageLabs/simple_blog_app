import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './blog.schema';
import { CreateCommentDto } from './dto/create-comments.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogService) {
  }

  @Post()
  async create(@Body() blog: CreateBlogDto) {
    await this.blogsService.create(blog);
  }

  @Put(':id')
  async edit(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() blog: CreateBlogDto,
  ) {
    await this.blogsService.edit(blog);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<Blog> {
    return this.blogsService.delete(id);
  }

  @Get()
  async findAll(): Promise<Blog[]> {
    return this.blogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Blog> {
    return this.blogsService.findOne(id);
  }

  @Get('like/:id')
  like(@Param('id', new ParseIntPipe()) id: number): Promise<Blog> {
    return this.blogsService.likeBlog(id);
  }

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
