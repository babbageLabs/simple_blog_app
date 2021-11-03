import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './schemas/blog.schema';
import { BlogsController } from './blog.controller';
import { BlogComments, BlogCommentsSchema } from './schemas/blog.comments';
import { BlogLikes, BlogLikesSchema } from './schemas/blog.likes';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    MongooseModule.forFeature([
      { name: BlogComments.name, schema: BlogCommentsSchema },
    ]),
    MongooseModule.forFeature([
      { name: BlogLikes.name, schema: BlogLikesSchema },
    ]),
  ],
  providers: [BlogService],
  controllers: [BlogsController],
})
export class BlogModule {}
