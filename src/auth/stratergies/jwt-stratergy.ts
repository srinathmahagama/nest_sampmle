import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/model/user";
import { UserService } from "src/user/user.service";
import { jwtSecret } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret
        })
    }

    async validate(validationPayload: { email: string, sub: string }): Promise<User> {
        const user = await this.usersService.getUserByEmail(validationPayload.email);
        return user;
    }
}