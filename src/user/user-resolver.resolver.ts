import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth-guard';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get.users.args';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { DeleteUserInput } from './dto/inputs/delete-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly usersService: UserService) {}

    @Query(() => User, { name: 'user', nullable: true })
    @UseGuards(GqlAuthGuard)
    getUser(@CurrentUser() user: User,  @Args() getUserArgs: GetUserArgs): Promise<User | undefined> {
        return this.usersService.getUser(getUserArgs);
    }

    // @Query(() => [User], { name: 'users', nullable: 'items' })
    // getUsers(@Args() getUsersArgs: GetUsersArgs): User[] {
    //     return this.usersService.getUsers(getUsersArgs);
    // }

    @Mutation(() => User)
    async createUser(@Args('createUserData') createUserData: CreateUserInput): Promise<User | undefined> {
        return this.usersService.createUser(createUserData)
    }

    // @Mutation(() => User)
    // updateUser(@Args('updateUserData') updateUserData: UpdateUserInput): User {
    //     return this.usersService.updateUser(updateUserData);
    // }

    // @Mutation(() => User)
    // deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): User {
    //     return this.usersService.deleteUser(deleteUserData);
    // }
}

