import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Blog } from './blog.schema';

export type BlogLikesDocument = BlogLikes & Document;

@Schema()
export class BlogLikes {
  @Prop({ required: true })
  blog: string;

  @Prop({ required: true })
  user: string;
}

export const BlogLikesSchema = SchemaFactory.createForClass(BlogLikes);
