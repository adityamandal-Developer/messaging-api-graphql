import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';

@Schema({ versionKey: false })
@ObjectType()
export class User extends AbstractEntity {
  @Prop()
  @Field()
  email: string;

  @Prop()
  @Field({ nullable: true })
  name: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
