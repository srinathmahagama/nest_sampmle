import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

//host email & password
const user = "";
const pass = "";

@Injectable()
export class EmailService {
    transport: any;
    constructor(){
        this.transport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: user,
              pass: pass,
            },
          });
    }

    public send(name: string, email: string, confirmationCode: string) {
        this.transport.sendMail({
            from: user,
            to: email,
            subject: "Please confirm your account",
            html: `<h1>Email Confirmation</h1>
                <h2>Hello ${name}</h2>
                <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
                <a href=http://localhost:3000/auth/confirm/${confirmationCode}> Click here</a>
                </div>`,
                }).catch((error) => {
                    console.log('email error ', error)
                })
    }

}

