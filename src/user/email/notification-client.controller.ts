import { HttpService } from '@nestjs/axios';
import { Controller, Post, Req } from '@nestjs/common';
import { EmailRequest } from '../model/email-request';

@Controller('notification-client')
export class NotificationClientController {

    constructor(private http: HttpService){}

     async sendMail(req: EmailRequest): Promise<any> {
         //sampmle request
        const arr = [
            {
             "to": ["srinath@haulmatic.com"],
             "subject": "Verify Email Address",
             "templateName": "new-job-file"
            }
           ]
           const headersRequest = {
            'Content-Type': 'application/json', // afaik this one is not needed,
        };
        console.log('--------------- brfore',arr)
          const t =  this.http.post<any>('http://localhost:8080/api/v1/notifications/email', [req],  { headers: headersRequest });
          console.log('--------------- after',t)
          t.subscribe(res => console.log('res ',res))
    }

}
