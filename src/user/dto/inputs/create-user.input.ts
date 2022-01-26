import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class CreateUserInput {

    @Field()
    name: string

    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    age: number;

    @Field()
    password: string
}
