import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { jwtSecret } from 'src/auth/constants';
import { uuid } from 'uuidv4';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get.users.args';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { DeleteUserInput } from './dto/inputs/delete-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/user/email/email.service';
import { HttpService } from '@nestjs/axios';
import { NotificationClientController } from './email/notification-client.controller';
import { EmailRequest } from './model/email-request';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private emailService: EmailService,
    private notificationClient: NotificationClientController,
    private httpService: HttpService){}

    private users: User[] = [
        {
            email: 'dan@example.com',
            //password: 'mypassword',
            _id: '123',
            age: 20,
            active: false,
            confirmationCode: '',
            name: ''
        }
    ];

    async createUser(createUserData: CreateUserInput): Promise<User> {
        const payload = {
            email: createUserData.email,
            secret: jwtSecret
        }
        const token = this.jwtService.sign(payload);
        const user: User = {
            _id: uuid(),
            email: createUserData.email,
            password: bcrypt.hashSync(createUserData.password, 8),
            active: false,
            confirmationCode: token,
            age: createUserData.age,
            name: createUserData.name
        }
        const createdUser = new this.userModel(user);
        const newUser = await createdUser.save();
        if(!newUser){
            return;
        }
        //this.emailService.send(newUser.name, newUser.email, newUser.confirmationCode);
        //need to create template like in email service as to confirm verification link
        const emailRequest: EmailRequest = {
            to: [newUser.email],
            subject: 'Verify Email Address',
            templateName: 'new-job-file',
            emailParams: {
                createdBy: 'Srinath',
                receiverName: newUser.name,
                jobFileName: '',
                jobFileUrl: '',
                jobType: ''
            }
        }
        //this.notificationClient.sendMail(emailRequest)
        return newUser;
    }

    // public updateUser(updateUserData: UpdateUserInput): User {
    //     const user = this.users.find(user => user.userId === updateUserData.userId);

    //     Object.assign(user, updateUserData);

    //     return user;
    // }

    public getUser(getUserArgs: GetUserArgs): Promise<User> {
        console.log("ggggggg ",getUserArgs)
        return this.userModel.findById(getUserArgs.userId).exec();
        //return this.users.find(user => user._id === getUserArgs.userId);
    }

    public getUserByEmail(email: string): Promise<User | undefined> {
        return this.userModel.findOne({email: email}).exec();
    }

    public getUserByConfirmationCode(confirmationCode: string): Promise<User> {
        return this.userModel.findOneAndUpdate({confirmationCode: confirmationCode}, {active: true}).exec();
    }

    // public getUsers(getUsersArgs: GetUsersArgs): User[] {
    //     return getUsersArgs.userIds.map(userId => this.getUser({ userId }));
    // }

    // public deleteUser(deleteUserData: DeleteUserInput): User {
    //     const userIndex = this.users.findIndex(user => user.userId === deleteUserData.userId);

    //     const user = this.users[userIndex];

    //     this.users.splice(userIndex);

    //     return user;
    // }
}
