import { Args, ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
@ArgsType()
export class GetMessageArgs {
  @Field()
  @IsNotEmpty()
  chatId: string;
}
