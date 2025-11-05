import { WelcomeEmail, ResetPasswordEmail } from "@repo/email-templates";
import { EmailService } from "src/common/emails/emails.service";
import {
  EMAIL_FROM,
  RESET_PASSWORD_EMAIL,
  WELCOME_VERIFY_EMAIL,
} from "src/common/emails/email.consts";

export class AuthService {
  constructor(private readonly emailService: EmailService) {}

  public async sendResetPassordEmail(
    to: string,
    data: {
      url: string;
      name: string;
    },
  ) {
    const email = await new ResetPasswordEmail({
      name: data.name,
      url: data.url,
    }).getHtml();

    await this.emailService.sendEmail({
      to: to,
      from: EMAIL_FROM,
      subject: RESET_PASSWORD_EMAIL.subject,
      html: email,
    });
  }

  public async sendWelcomeVerifyEmail(
    to: string,
    data: {
      email: string;
      name: string;
      url: string;
    },
  ) {
    const email = await new WelcomeEmail({
      name: data.name,
      redirectUrl: data.url,
      email: data.email,
    }).getHtml();

    await this.emailService.sendEmail({
      to: to,
      from: EMAIL_FROM,
      subject: WELCOME_VERIFY_EMAIL.subject,
      html: email,
    });
  }
}
