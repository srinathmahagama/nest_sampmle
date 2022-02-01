import { Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { Request } from 'express';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';



@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req: Request): { access_token: string } {
        return this.authService.login(req.user as User);
    }

    @Get('confirm/:confirmationCode')
    verifyUserEmail(@Param('confirmationCode') confirmationCode: string) {
        return this.authService.verifyUserEmail(confirmationCode);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin()
    {
        // initiates the Google OAuth2 login flow
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req, @Res() res)
    {
        // handles the Google OAuth2 callback
        const jwt: string = req.user.jwt;
        if (jwt)
        //front end pages need to implement
            res.redirect('http://localhost:4200/login/succes/' + jwt);
        else 
            res.redirect('http://localhost:4200/login/failure');
    }
}
