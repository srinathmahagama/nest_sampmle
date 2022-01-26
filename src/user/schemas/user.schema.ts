import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
//const passportLocalMongooseEmail = require('passport-local-mongoose-email');

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User {

  @Prop() 
  @Field()
  _id: string

  @Prop()
  @Field()
  name: string

  @Prop()
  @Field()
  email: string;

  @Prop()
  @Field()
  age: number;


  @Prop()
  @Field({ nullable: true })
  password?: string

  @Prop()
  @Field()
  active: boolean

  @Prop()
  @Field({ nullable: true })
  confirmationCode: string

}

export const UserSchema = SchemaFactory.createForClass(User);
