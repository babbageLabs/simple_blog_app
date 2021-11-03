import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { Model } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { CreateCommentDto } from './dto/create-comments.dto';
import { BlogLikes, BlogLikesDocument } from './schemas/blog.likes';
import { BlogComments, BlogCommentsDocument } from './schemas/blog.comments';

function stringToSlug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuunc------';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    @InjectModel(BlogComments.name)
    private blogCommentsModel: Model<BlogCommentsDocument>,
    @InjectModel(BlogLikes.name)
    private blogLikesModel: Model<BlogLikesDocument>,
  ) {}

  async create(blog: CreateBlogDto, user: any): Promise<Blog> {
    const slug = stringToSlug(blog.title);

    return this.blogModel.create({ ...blog, slug, owner: user.username });
  }

  async edit(blog: CreateBlogDto, user: any, id: string): Promise<Blog> {
    const current = await this.findOne(id);
    if (current.owner !== user.username) {
      throw new HttpException('You are not permitted to edit this post', 400);
    }

    return this.blogModel.findByIdAndUpdate(
      id,
      {
        ...blog,
        slug: stringToSlug(blog.title),
      },
      {
        new: true,
      },
    );
  }

  async delete(id: string): Promise<any> {
    return this.blogModel.deleteOne({ id }).exec();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: string): Promise<Blog> {
    return this.blogModel.findById(id).lean().exec();
  }

  async likeBlog(id: string, user: any): Promise<BlogLikes> {
    return this.blogLikesModel.findOneAndUpdate(
      { blog: id, user: user.username },
      { blog: id, user: user.username },
      { upsert: true, new: true, setDefaultsOnInsert: true },
      (error, result) => {
        if (!error) return;
      },
    );
  }

  async unlikeBlog(id: string, user: any): Promise<any> {
    const like = await this.blogLikesModel
      .find({
        user: user.username,
        blog: id,
      })
      .lean()
      .exec();

    console.log(222222222222, like);

    if (like) {
      // delete the like
      // await this.blogLikesModel.deleteOne({ id: like.id });
      return {
        unliked: true,
      };
    }

    return {
      unliked: false,
    };
  }

  async commentBlog(
    id: string,
    comment: CreateCommentDto,
    user: any,
  ): Promise<BlogComments> {
    return this.blogCommentsModel.create({
      parent: id,
      user: user.username,
      ...comment,
    });
  }
}
