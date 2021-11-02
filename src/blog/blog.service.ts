import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { Model } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { CreateCommentDto } from './dto/create-comments.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async create(blog: CreateBlogDto) {
    return this.blogModel.create(blog);
  }

  async edit(blog: CreateBlogDto) {
    return this.blogModel.create(blog);
  }

  async delete(id: number): Promise<Blog> {
    return this.blogModel.find().exec()[0];
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: number): Promise<Blog> {
    return this.blogModel.find().exec()[0];
  }

  async likeBlog(id: number): Promise<Blog> {
    return this.blogModel.find().exec()[0];
  }

  async unlikeBlog(id: number): Promise<Blog> {
    return this.blogModel.find().exec()[0];
  }

  async commentBlog(id: number, comment: CreateCommentDto): Promise<Blog> {
    return this.blogModel.find().exec()[0];
  }
}
