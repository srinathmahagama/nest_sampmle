import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { jwtSecret } from './constants';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService)
        {}
        async validate(email: string, password: string): Promise<User | null> {
            const user = await this.userService.getUserByEmail(email);
    
            if (!user) {
                return null;
            }
    
            //const encryptedPassword = bcrypt.compareSync(password,0);
            const passwordIsValid = bcrypt.compareSync(password, user.password)
            return passwordIsValid ? user : null;
        }
    
        login(user: User): { access_token: string } {
            const payload = {
                email: user.email,
                sub: user._id
            }
    
            return {
                access_token: this.jwtService.sign(payload),
            }
        }
    
        async verify(token: string): Promise<User> {
            const decoded = this.jwtService.verify(token, {
                secret: jwtSecret
            })
    
            const user = await this.userService.getUserByEmail(decoded.email);
    
            if (!user) {
                throw new Error('Unable to get the user from decoded token.');
            }
    
            return user;
        }

        async verifyUserEmail(confirmationCode: string): Promise<User> {
            const user = this.userService.getUserByConfirmationCode(confirmationCode);
            if(!user){
                throw new Error('Unable to get the user from confirmation code');
            }
            console.log("confirmed user ", user)
            return user;
        }
}
