import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { config } from "dotenv";
import { Strategy} from "passport-google-oauth20";
import { AuthService, Provider} from "../auth.service";

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(
    private authService: AuthService
  ) {
    super({
      //clientID: '525701728635-gl1rga1ot6slvrfgi2f63l3rrcprpms5.apps.googleusercontent.com',
      //clientSecret: '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',
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      passReqToCallback: true,
      scope: ['profile']
    });
  }

  async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function)
    {
        try
        {
          console.log('refre ',request)
            console.log('fffff ',profile);

            const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE)
            const user = 
            {
                jwt
            }

            done(null, user);
        }
        catch(err)
        {
            // console.log(err)
            done(err, false);
        }
    }
}