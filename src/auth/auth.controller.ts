import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { Request } from 'express';
import { User, UserDocument } from 'src/user/schemas/user.schema';



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
}
