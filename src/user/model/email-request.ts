import { EmailParameters } from "./email-parameters";

export class EmailRequest {
    to: string[];
    templateName: string;
    subject: string;
    emailParams: EmailParameters
}