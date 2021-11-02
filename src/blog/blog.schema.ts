import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Users } from '../users/users.owner.schema';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  slug: number;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  createdOn: string;

  @Prop()
  updatedOn: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: Users;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
