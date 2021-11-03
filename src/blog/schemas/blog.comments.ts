import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogCommentsDocument = BlogComments & Document;

@Schema()
export class BlogComments {
  @Prop({ required: true })
  parent: string;

  @Prop({ required: true })
  parentType: string; // can be a comment or another blog

  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  comment: string;
}

export const BlogCommentsSchema = SchemaFactory.createForClass(BlogComments);
