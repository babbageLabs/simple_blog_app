import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserFollowersDocument = UserFollowers & Document;

@Schema()
export class UserFollowers {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  followers: [string];
}

export const UserFollowersSchema = SchemaFactory.createForClass(UserFollowers);
