import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { jwtSecret } from 'src/auth/constants';
import { EmailService } from 'src/user/email/email.service';
import { NotificationClientController } from './email/notification-client.controller';
import { User, UserSchema } from './schemas/user.schema';
import { UserResolver } from './user-resolver.resolver';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  JwtModule.register({
    secret: jwtSecret,
    signOptions: { expiresIn: '3600s' }
  }),
  HttpModule
],
  providers: [UserResolver, UserService,EmailService, NotificationClientController],
  exports: [UserService],
})
export class UserModule {}
