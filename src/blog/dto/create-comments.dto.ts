import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  parentType: string;

  @IsNotEmpty()
  comment: string;
}
